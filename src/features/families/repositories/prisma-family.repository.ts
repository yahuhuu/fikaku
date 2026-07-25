import { prisma } from "@/shared/lib/prisma";
import type {
  AddFamilyMemberResult,
  FamilyDetail,
  FamilyListItem,
  FamilyMemberListItem,
  FamilyRepository,
} from "./family.repository";

function toFamilyListItem(member: {
  role: "OWNER" | "MEMBER";
  family: {
    id: string;
    name: string;
    transactionMode: "AUTO_FAMILY" | "ALLOW_PERSONAL";
    _count: { members: number };
  };
}): FamilyListItem {
  return {
    id: member.family.id,
    name: member.family.name,
    transactionMode: member.family.transactionMode,
    role: member.role,
    memberCount: member.family._count.members,
  };
}

function toMemberListItem(member: {
  id: string;
  userId: string;
  role: "OWNER" | "MEMBER";
  user: { name: string | null; email: string };
}): FamilyMemberListItem {
  return {
    id: member.id,
    userId: member.userId,
    name: member.user.name,
    email: member.user.email,
    role: member.role,
  };
}

export const prismaFamilyRepository: FamilyRepository = {
  async create(data): Promise<FamilyListItem> {
    const family = await prisma.family.create({
      data: {
        name: data.name,
        transactionMode: data.transactionMode,
        createdById: data.userId,
        members: {
          create: {
            userId: data.userId,
            role: "OWNER",
          },
        },
      },
      include: { _count: { select: { members: true } } },
    });

    return {
      id: family.id,
      name: family.name,
      transactionMode: family.transactionMode,
      role: "OWNER",
      memberCount: family._count.members,
    };
  },

  async listForUser(userId): Promise<FamilyDetail[]> {
    const memberships = await prisma.familyMember.findMany({
      where: { userId },
      include: {
        family: {
          include: {
            _count: { select: { members: true } },
            members: {
              include: { user: { select: { name: true, email: true } } },
              orderBy: [{ role: "desc" }, { createdAt: "asc" }],
            },
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    return memberships.map((membership) => ({
      ...toFamilyListItem(membership),
      members: membership.family.members.map(toMemberListItem),
    }));
  },

  async addMemberByEmail(data): Promise<AddFamilyMemberResult> {
    const ownerMembership = await prisma.familyMember.findFirst({
      where: { familyId: data.familyId, userId: data.ownerId, role: "OWNER" },
      select: { id: true },
    });
    if (!ownerMembership) return { ok: false, error: "Only family owner can add members" };

    const user = await prisma.user.findUnique({
      where: { email: data.email },
      select: { id: true, name: true, email: true },
    });
    if (!user) return { ok: false, error: "User with that email is not registered" };

    const existing = await prisma.familyMember.findUnique({
      where: { familyId_userId: { familyId: data.familyId, userId: user.id } },
      include: { user: { select: { name: true, email: true } } },
    });
    if (existing) return { ok: false, error: "User is already a family member" };

    const member = await prisma.familyMember.create({
      data: { familyId: data.familyId, userId: user.id, role: "MEMBER" },
      include: { user: { select: { name: true, email: true } } },
    });

    return { ok: true, member: toMemberListItem(member) };
  },

  async updateSettings(data): Promise<FamilyListItem | null> {
    const owner = await prisma.familyMember.findFirst({
      where: { familyId: data.familyId, userId: data.userId, role: "OWNER" },
      select: { id: true },
    });
    if (!owner) return null;

    const family = await prisma.family.update({
      where: { id: data.familyId },
      data: { name: data.name, transactionMode: data.transactionMode },
      include: { _count: { select: { members: true } } },
    });

    return {
      id: family.id,
      name: family.name,
      transactionMode: family.transactionMode,
      role: "OWNER",
      memberCount: family._count.members,
    };
  },

  async isMember(data): Promise<boolean> {
    const member = await prisma.familyMember.findUnique({
      where: { familyId_userId: { familyId: data.familyId, userId: data.userId } },
      select: { id: true },
    });
    return Boolean(member);
  },

  async canEditFamilyTransaction(data): Promise<boolean> {
    return this.isMember(data);
  },

  async canDeleteFamilyTransaction(data): Promise<boolean> {
    if (data.transactionOwnerId === data.userId) return true;
    const owner = await prisma.familyMember.findFirst({
      where: { familyId: data.familyId, userId: data.userId, role: "OWNER" },
      select: { id: true },
    });
    return Boolean(owner);
  },
};
