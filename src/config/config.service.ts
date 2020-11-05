import { Injectable } from '@nestjs/common';

import { DEFAULT_CONFIG } from './config.default';
import { ConfigData, ConfigDBData } from './config.interface';

/**
 * Provides a means to access the application configuration.
 */
@Injectable()
export class ConfigService {
  private config: ConfigData;

  constructor(data: ConfigData = DEFAULT_CONFIG) {
    this.config = data;
  }

  /**
   * Loads the config from environment variables.
   */
  public lofusingDotEnv() {
    this.config = this.parseConfigFromEnv(process.env);
    console.log(this.config);
  }

  private parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
    return {
      env: env.NODE_ENV || DEFAULT_CONFIG.env,
      port: env.PORT ? parseInt(env.PORT, 10) : DEFAULT_CONFIG.port,
      db: this.parseDbConfigFromEnv(env) || DEFAULT_CONFIG.db,
      logLevel: env.LOG_LEVEL || DEFAULT_CONFIG.logLevel,
    };
  }

  private parseDbConfigFromEnv(env: NodeJS.ProcessEnv): ConfigDBData {
    return {
      type: env.DB_CONNECTION || '',
      user: env.DB_USERNAME || '',
      pass: env.DB_PASSWORD || '',
      name: env.DB_DATABASE || '',
      host: env.DB_HOST || '',
      port: parseInt(env.DB_PORT || 'NaN', 10)
    };
  }
  public get(): Readonly<ConfigData> {
    return this.config;
  }
}
