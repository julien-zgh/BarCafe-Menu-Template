import DOMPurify from "dompurify";
import { useMemo } from "react";

const SafeHtml = ({ html }: { html: string }) => {
  const cleanHtml = useMemo(() => {
    // Create a DOMPurify instance
    const purifier = DOMPurify.sanitize(html, {
      FORBID_TAGS: ["img"], // remove images
      ADD_ATTR: ["target", "rel"], // allow these attributes
    });

    // Use a hook to modify all links
    DOMPurify.addHook("afterSanitizeAttributes", (node) => {
      if (node.tagName === "A") {
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "noopener noreferrer");
      }
    });

    return purifier;
  }, [html]);

  return (
    <div
      className="text-muted-foreground [&>h1]:text-3xl [&>h2]:text-xl"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
};

export default SafeHtml;
