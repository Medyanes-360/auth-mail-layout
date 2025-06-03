import {
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export default function NewUserGreet({ resetLink }) {
  return (
    <Html>
      <Head>
        <style>{`.font-helvetica { font-family: Helvetica, Arial, sans-serif !important; }`}</style>
      </Head>
      <Preview>
        Şifre Sıfırlama Talebiniz için tek kullanımlık linkiniz.
      </Preview>
      <Tailwind>
        <Section className="bg-white p-8 rounded shadow-md max-w-md mx-auto font-helvetica">
          <Heading className="text-center text-2xl font-bold mb-4">
            Şifre Sıfırlama Talebi
          </Heading>
          <Text className="text-center text-lg mb-2">
            Aşağıdaki linke tıklayarak şifrenizi sıfırlayabilirsiniz.
          </Text>
          <Text className="text-center text-base mb-2">{resetLink}</Text>
        </Section>
      </Tailwind>
    </Html>
  );
}
