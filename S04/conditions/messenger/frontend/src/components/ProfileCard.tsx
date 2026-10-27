import React from "react";
import type { User } from "../types";

type Props = {
  profile: User | null;
};

export function ProfileCard({ profile }: Props) {
  if (!profile) return null;

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
      <div><strong>Ник:</strong> {profile.nickname}</div>
      <div><strong>Телефон:</strong> {profile.phone}</div>
      <div><strong>Описание:</strong> {profile.bio || "—"}</div>
    </div>
  );
}

export default ProfileCard;