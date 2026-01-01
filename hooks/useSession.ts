import { db } from "@/lib/db";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    db.setSession((session: Session) => {
      setSession(session);
      db.summarizeDataByCategory(
        // prettier-ignore
        '2001-01-01',
        // prettier-ignore
        '2027-01-01',
        session.user.id
      ).then(console.log);
    });
  }, []);

  return {
    session,
    sessionAvailable: !!session,
    user: session?.user,
  };
};
