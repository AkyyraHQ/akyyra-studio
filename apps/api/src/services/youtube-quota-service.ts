import { prisma } from '../lib/prisma.js';

export const youtubeQuotaService = {
  async incrementUnits(units: number) {
    const day = new Date();
    day.setUTCHours(0, 0, 0, 0);
    const existing = await prisma.youtubeQuotaUsage.findUnique({
      where: { day },
    });

    if (!existing) {
      return prisma.youtubeQuotaUsage.create({
        data: { day, unitsUsed: units },
      });
    }

    return prisma.youtubeQuotaUsage.update({
      where: { day },
      data: { unitsUsed: { increment: units } },
    });
  },
};
