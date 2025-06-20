import { InfluxDB } from "@influxdata/influxdb-client";

const token = "kSRa2vJQUdUs3vlmuUCXBnBsQ5y_PVuhgCnntVkBIQimfz_TBaoTyFbmDV7hT_PXLyN-2vrZju5hB0IAsCwIYg==";
const org = "Haw"; // exakt wie aus influx org list
const bucket = "messdaten";
const url = "http://192.168.137.133:8086";


const client = new InfluxDB({ url, token });
const queryApi = client.getQueryApi(org);

export const fetchSensorData = (
  timeRange: string,
  measurement: string
): Promise<{ time: string; value: number }[]> => {
  return new Promise((resolve, reject) => {
    const results: { time: string; value: number }[] = [];

    const fluxQuery = `from(bucket: "${bucket}")
      |> range(start: ${timeRange})
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
