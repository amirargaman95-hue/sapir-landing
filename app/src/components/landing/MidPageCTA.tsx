import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { WHATSAPP_URL } from "@/data/content";

type Props = {
  text: string;
  buttonText?: string;
};

export default function MidPageCTA({ text, buttonText = "WhatsApp" }: Props) {
  return (
    <aside className="mid-cta" aria-label="קריאה לפעולה">
      <div className="container-prose">
        <div className="mid-cta-inner">
          <p className="mid-cta-text">{text}</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: "0.85rem 1.5rem" }}
          >
            <WhatsappLogo size={18} weight="fill" />
            <span>{buttonText}</span>
            <span aria-hidden className="arrow">←</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
