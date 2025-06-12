// src/services/influxService.ts
import { InfluxDB } from "@influxdata/influxdb-client";

const token = "DEIN_TOKEN";
const org = "DEINE_ORG";
const bucket = "DEIN_BUCKET";
const url = "http://192.168.1.42:8086"; // IP von deinem Raspberry Pi

const client = new InfluxDB({ url, token });
const queryApi = client.getQueryApi(org);

export const fetchSensorData = (
  timeRange: string,
  measurement: string
): Promise<{ time: string; value: number }[]> => {
  return new Promise((resolve, reject) => {
    const results: { time: string; value: number }[] = [];

    const fluxQuery = `from(bucket: "${bucket}")
      |> range(start: ${JSON.stringify(timeRange)})
      |> filter(fn: (r) => r._measurement == "${measurement}")`;

    queryApi.queryRows(fluxQuery, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);
        results.push({ time: o._time, value: o._value });
      },
      error(error) {
        console.error("InfluxDB Query Error:", error);
        reject(error);
      },
      complete() {
        resolve(results);
      },
    });
  });
};
