import {
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export default function NewUserGreet({ username = "Kullanıcı" }) {
  return (
    <Html>
      <Head>
        <style>{`.font-helvetica { font-family: Helvetica, Arial, sans-serif !important; }`}</style>
      </Head>
      <Preview>Medyanes'e hoş geldiniz, {username}!</Preview>
      <Tailwind>
        <Section className="bg-white p-8 rounded shadow-md max-w-md mx-auto font-helvetica">
          <Heading className="text-center text-2xl font-bold mb-4">
            Hoş Geldiniz, {username}!
          </Heading>
          <Text className="text-center text-lg mb-2">
            Medyanes ailesine katıldığınız için çok mutluyuz. Size en iyi
            deneyimi sunmak için buradayız.
          </Text>
          <Text className="text-center text-base mb-2">
            Herhangi bir sorunuz olursa, destek ekibimizle iletişime
            geçebilirsiniz.
          </Text>
          <Text className="text-center text-sm text-gray-500 mt-4">
            Keyifli kullanımlar dileriz!
            <br />
            Medyanes Ekibi
          </Text>
        </Section>
      </Tailwind>
    </Html>
  );
}
