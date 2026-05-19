import { prisma } from '../lib/prisma.js';

type AuditInput = {
  userId: string;
  action: string;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
};

export const auditService = {
  log(input: AuditInput) {
    return prisma.userActionLog.create({
      data: {
        userId: input.userId,
        action: input.action,
        entityType: input.entityType,
        entityId: input.entityId,
        metadata: input.metadata,
      },
    });
  },
};
