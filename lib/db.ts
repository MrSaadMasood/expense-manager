import { Database, Tables } from "@/database.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createClient,
  processLock,
  Session,
  SupabaseClient,
} from "@supabase/supabase-js";
import { AppState, Platform } from "react-native";
import "react-native-url-polyfill/auto";
import { config } from "./env";

export type Category = Tables<"categories">;
export type Record = Tables<"records">;

class Db {
  private readonly supabase: SupabaseClient<Database>;

  constructor() {
    this.supabase = createClient<Database>(
      config.supabaseUrl,
      config.supabaseAnonKey,
      {
        auth: {
          ...(Platform.OS !== "web" ? { storage: AsyncStorage } : {}),
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
          lock: processLock,
        },
      }
    );
    // Tells Supabase Auth to continuously refresh the session automatically
    // if the app is in the foreground. When this is added, you will continue
    // to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
    // `SIGNED_OUT` event if the user's session is terminated. This should
    // only be registered once.
    if (Platform.OS !== "web") {
      AppState.addEventListener("change", (state) => {
        if (state === "active") {
          this.supabase.auth.startAutoRefresh();
        } else {
          this.supabase.auth.stopAutoRefresh();
        }
      });
    }
  }

  setSession(cb: (session: Session) => void) {
    this.supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) cb(session);
    });
    this.supabase.auth.onAuthStateChange((_event, session) => {
      if (session) cb(session);
    });
  }

  signInWithPassword(data: { email: string; password: string }) {
    return this.supabase.auth.signInWithPassword(data);
  }

  signUp(data: { email: string; password: string }) {
    return this.supabase.auth.signUp(data);
  }

  logout() {
    return this.supabase.auth.signOut();
  }

  getCategories() {
    return this.supabase.from("categories").select();
  }

  insertCategories(c: Category[]) {
    return this.supabase.from("categories").insert(c);
  }

  deleteAllCategories() {
    return this.supabase.from("categories").delete();
  }

  deleteACategory(id: string) {
    return this.supabase.from("categories").delete().eq("id", id);
  }

  updateCategory(id: string, c: Partial<Category>) {
    return this.supabase.from("categories").update(c).eq("id", id);
  }

  getCurrentBalance() {
    return this.supabase.rpc("get_current_balance");
  }

  addNewRecord(data: Record) {
    return this.supabase.from("records").insert(data);
  }

  summarizeDataByCategory(startDate: string, endDate: string, userId: string) {
    console.log("THe user id is", userId, startDate, endDate);
    return this.supabase.rpc("summarize_data_by_category", {
      start_date: startDate,
      end_date: endDate,
    });
  }

  getLastRecordsOverview(
    startDate: string,
    endDate: string,
    category: string = ""
  ) {
    return this.supabase.rpc("get_last_records_overview", {
      start_date: startDate,
      end_date: endDate,
      category,
    });
  }

  getCategoryClassDate(
    startDate: string,
    endDate: string,
    categoryClass: string = "all"
  ) {
    return this.supabase.rpc("get_category_class_data", {
      start_date: startDate,
      end_date: endDate,
      category_class: categoryClass,
    });
  }

  getSavingsAmount() {
    return this.supabase.rpc("get_savings_amount");
  }
}

export const db = new Db();
