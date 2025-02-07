import AuthValidator from "@/components/self/AuthValidator";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthValidator>{children}</AuthValidator>;
}