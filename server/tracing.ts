import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import {
  PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics';
import dotenv from "dotenv"
import { selectEnv, typeEnv } from './src/utils/selectEnv'
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';

import * as opentelemetry from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';
import { BunyanInstrumentation } from '@opentelemetry/instrumentation-bunyan';

const ambiente = selectEnv((process.env.NODE_ENV as typeEnv))
if (ambiente !== "prod") {
    dotenv.config({
        path: ambiente
    })
}

const sdk = new opentelemetry.NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: `${process.env.OTEL_COLLECTOR}/v1/traces`,
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: `${process.env.OTEL_COLLECTOR}/v1/metrics`,
    }),
  }),
  logRecordProcessor: new opentelemetry.logs.SimpleLogRecordProcessor(new OTLPLogExporter()),

  instrumentations: [getNodeAutoInstrumentations(), new BunyanInstrumentation()],
});
sdk.start();