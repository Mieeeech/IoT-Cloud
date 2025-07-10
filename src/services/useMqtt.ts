import { useEffect, useState } from "react";
import mqtt from "mqtt";

export interface MqttData {
  [key: string]: number; // z.B. { Sollfrequenz: 50, Istfrequenz: 49.9, ... }
}

export const useMqtt = (topic: string) => {
  const [data, setData] = useState<MqttData | null>(null);

  useEffect(() => {
    const client = mqtt.connect("ws://192.168.0.42:9001");

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      client.subscribe(topic, (err) => {
        if (err) console.error("Subscribe error:", err);
      });
    });

 client.on("message", (t, payload) => {
  if (t === topic) {
    const message = payload.toString().trim();
    const parsed: MqttData = {};

    if (message.includes(":")) {
      // Format: Sollfrequenz:50;Istfrequenz:49.9
      const parts = message.split(";");
      parts.forEach((part) => {
        const [key, val] = part.split(":");
        const num = parseFloat(val);
        if (key && !isNaN(num)) {
          parsed[key] = num;
        }
      });

    } else if (message.includes(";")) {
      // Format: 1751616779285;-0.001 → vibrationsdaten
      const [_, value] = message.split(";");
      const num = parseFloat(value);
      if (!isNaN(num)) {
        parsed["Vibration"] = num;
      }

    } else if (message.includes(",")) {
  // Neues CSV-Format: timestamp,zsw,Sollfrequenz,IstfrequenzmitSlip,IstfrequenzohneSlip,Drehmoment
  const parts = message.split(",");
  if (parts.length === 6) {
    const [timestamp, zsw, soll, istMitSlip, istOhneSlip, drehmoment] = parts;

    const tsNum = parseInt(timestamp);
    const zswNum = parseFloat(zsw);
    const sollNum = parseFloat(soll);
    const istMitSlipNum = parseFloat(istMitSlip);
    const istOhneSlipNum = parseFloat(istOhneSlip);
    const drehNum = parseFloat(drehmoment);

    if (
      !isNaN(tsNum) &&
      !isNaN(zswNum) &&
      !isNaN(sollNum) &&
      !isNaN(istMitSlipNum) &&
      !isNaN(istOhneSlipNum) &&
      !isNaN(drehNum)
    ) {
      parsed["timestamp"] = tsNum;
      parsed["ZSW"] = zswNum;
      parsed["Sollfrequenz"] = sollNum;
      parsed["IstfrequenzmitSlip"] = istMitSlipNum;       
      parsed["IstfrequenzohneSlip"] = istOhneSlipNum;     
      parsed["Drehmoment"] = drehNum;
    }
  }
}

    if (Object.keys(parsed).length > 0) {
      setData(parsed);
    } else {
      console.warn("Ungültige MQTT-Nutzdaten:", message);
    }
  }
});



    return () => {
      client.end();
    };
  }, [topic]);

  return data;
};
