import { describe, expect, it } from "vitest";
import { resolveTransactionFamily } from "./resolve-transaction-family.service";
import type { FamilyListItem } from "../repositories/family.repository";

const autoFamily: FamilyListItem = { id: "fam_auto", name: "Rumah", transactionMode: "AUTO_FAMILY", role: "MEMBER", memberCount: 2 };
const personalFamily: FamilyListItem = { id: "fam_personal", name: "Orang Tua", transactionMode: "ALLOW_PERSONAL", role: "MEMBER", memberCount: 3 };

describe("resolveTransactionFamily", () => {
  it("keeps transaction personal when user has no family", () => {
    expect(resolveTransactionFamily({ familyId: undefined, families: [] })).toEqual({ ok: true, familyId: undefined });
  });

  it("automatically uses the only auto-family when it is the user's only family", () => {
    expect(resolveTransactionFamily({ familyId: undefined, families: [autoFamily] })).toEqual({ ok: true, familyId: "fam_auto" });
  });

  it("allows personal transactions when at least one family allows personal mode", () => {
    expect(resolveTransactionFamily({ familyId: "personal", families: [autoFamily, personalFamily] })).toEqual({ ok: true, familyId: undefined });
  });

  it("rejects personal transactions when all families are auto-family mode", () => {
    expect(resolveTransactionFamily({ familyId: "personal", families: [autoFamily] })).toEqual({ ok: false, error: "Personal transaction is not allowed for your family settings" });
  });

  it("accepts a selected family membership", () => {
    expect(resolveTransactionFamily({ familyId: "fam_personal", families: [autoFamily, personalFamily] })).toEqual({ ok: true, familyId: "fam_personal" });
  });
});
