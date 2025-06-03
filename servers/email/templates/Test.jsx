import {
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export default function OtpEmail({
  otpCode = "012345",
  userName = "Kullanıcı",
}) {
  return (
    <Html>
      <Head>
        <style>{`.font-helvetica { font-family: Helvetica, Arial, sans-serif !important; }`}</style>
      </Head>
      <Preview>Hizmetimize giriş yapmak için kodunuz: {otpCode}</Preview>
      <Tailwind>
        <Container className="bg-gray-50 py-12">
          <Section className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto font-helvetica">
            <Heading className="text-center text-2xl font-bold mb-4">
              Merhaba {userName},
            </Heading>
            <Text className="text-center text-lg mb-2">
              Hesabınıza güvenli giriş yapabilmeniz için tek kullanımlık
              doğrulama kodunuz aşağıdadır.
            </Text>
            <div className="text-center my-7">
              <span className="inline-block text-3xl font-mono tracking-widest bg-gray-100 px-6 py-3 rounded-lg border border-gray-200">
                {otpCode}
              </span>
            </div>
            <Text className="text-center text-xs text-gray-500 mb-2">
              Bu kodu giriş ekranında ilgili alana girerek işleminizi
              tamamlayabilirsiniz. Kodunuz 10 dakika boyunca geçerlidir.
            </Text>
            <Text className="text-center text-xs text-gray-500 mb-2">
              Eğer bu işlemi siz başlatmadıysanız, lütfen bu e-postayı dikkate
              almayınız ve hesabınızın güvenliğinden emin olun.
            </Text>
            <div className="border-t border-gray-200 mt-6 pt-4">
              <Text className="text-center text-xs text-gray-400">
                Medyanes 360 | {new Date().getFullYear()}
              </Text>
            </div>
          </Section>
        </Container>
      </Tailwind>
    </Html>
  );
}
