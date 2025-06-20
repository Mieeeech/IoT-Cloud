import { useEffect, useState } from "react";
import mqtt from "mqtt";

export const useMqtt = (topic: string) => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const client = mqtt.connect("ws://192.168.137.133:9001"); // z. B. ws://192.168.1.100:9001

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      client.subscribe(topic, (err) => {
        if (err) console.error("Subscribe error:", err);
      });
    });

    client.on("message", (t, payload) => {
      if (t === topic) {
        setMessage(payload.toString());
      }
    });

    return () => {
      client.end();
    };
  }, [topic]);

  return message;
};
