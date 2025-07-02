import { InfluxDB } from "@influxdata/influxdb-client";

const token = "zgYweV47xutHicVr8XGOqR_DZ-tE8Oz2TSPBFRmmQxFFBwumXhkDj0VagvKkSNZvx_xDDpLxcD7mWMvJWX2Bsg==";
const org = "PredictiveMaintenance";
const bucket = "IIoT_DataBase";
const url = "http://192.168.0.42:8086";

const client = new InfluxDB({ url, token });
const queryApi = client.getQueryApi(org);

// ✅ Feldspezifische Daten abfragen
export const fetchSensorDataWithField = (
  timeRange: string,
  measurement: string,
  field: string
): Promise<{ time: string; value: number }[]> => {
  return new Promise((resolve, reject) => {
    const results: { time: string; value: number }[] = [];

    const fluxQuery = `from(bucket: "${bucket}")
      |> range(start: ${timeRange})
      |> filter(fn: (r) => r._measurement == "${measurement}")
      |> filter(fn: (r) => r._field == "${field}")
      |> window(every: 1s)
      |> limit(n: 1)
      |> yield()
    `;

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

// ✅ Allgemeine Messdaten abfragen (ohne Feld)
export const fetchSensorData = (
  timeRange: string,
  measurement: string
): Promise<{ time: string; value: number }[]> => {
  return new Promise((resolve, reject) => {
    const results: { time: string; value: number }[] = [];

    const fluxQuery = `from(bucket: "${bucket}")
      |> range(start: ${timeRange})
      |> filter(fn: (r) => r._measurement == "${measurement}")
    `;

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
