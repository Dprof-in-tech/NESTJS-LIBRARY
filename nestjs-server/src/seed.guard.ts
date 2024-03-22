import { Injectable } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Injectable()
export class SeedGuard {
  constructor(private readonly seederService: SeederService) {}

  async checkAndSeedIfNeeded(): Promise<void> {
    const isSeeded = await this.seederService.isSeeded();

    if (!isSeeded) {
      await this.seederService.seed();
    }
  }
}
