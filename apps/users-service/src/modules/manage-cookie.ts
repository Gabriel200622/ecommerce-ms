import { serialize } from "cookie";

export class ManageCookie {
  public static serialize(name: string, value: string, maxAge: number) {
    const serialized = serialize(name, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: maxAge,
      path: "/",
      domain:
        process.env.NODE_ENV === "production"
          ? `.${process.env.SITE_URL_COOKIE}`
          : undefined,
    });

    return serialized;
  }
}
