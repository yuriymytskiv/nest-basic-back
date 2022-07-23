import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async getHello(): Promise<any> {
    await this.cacheManager.set('key', 'value', { ttl: 10 });
    return await this.cacheManager.get('key');
  }
}
