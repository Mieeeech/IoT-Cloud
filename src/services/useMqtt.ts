import { useEffect, useState } from "react";
import mqtt from "mqtt";

export interface MqttData {
  timestamp: number;
  value: number;
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
        const [timestampStr, valueStr] = message.split(";");
        const timestamp = parseInt(timestampStr, 10);
        const value = parseFloat(valueStr);
        if (!isNaN(timestamp) && !isNaN(value)) {
          setData({ timestamp, value });
        } else {
          console.warn("Ungültige MQTT-Daten:", message);
        }
      }
    });

    return () => {
      client.end();
    };
  }, [topic]);

  return data;
};
