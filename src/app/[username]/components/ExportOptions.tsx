"use client";

import Image from "next/image";
import toast from "react-hot-toast";

export default function ExportOptions({ username, imageUrl }) {
  const exportPNG = () => {
    if (imageUrl) {
      fetch(imageUrl)
        .then(response => response.text())
        .then(svgText => {
          const svg = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
          const url = URL.createObjectURL(svg);
          const img = new window.Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              URL.revokeObjectURL(url);
              const dataUrl = canvas.toDataURL("image/png");
              const link = document.createElement("a");
              link.href = dataUrl;
              link.download = `${username}.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              toast.success("PNG downloaded successfully.");
            } else {
              toast.error("Failed to get canvas context.");
            }
          };
          img.src = url;
        })
        .catch(() => {
          toast.error("Failed to convert SVG to PNG.");
        });
    } else {
      toast.error("Image URL is not available.");
    }
  };

  const exportMarkdown = () => {
    const markdownContent = `![${username}](${imageUrl})`;
    navigator.clipboard.writeText(markdownContent).then(() => {
      toast.success("Markdown copied to clipboard.");
    }).catch(() => {
      toast.error("Failed to copy Markdown.");
    });
  };

  const exportURL = () => {
    const url = `${imageUrl}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success("URL copied to clipboard.");
    }).catch(() => {
      toast.error("Failed to copy URL.");
    });
  };

  const exportImg = () => {
    const imgTag = `<img src="${imageUrl}" alt="${username}" />`;
    navigator.clipboard.writeText(imgTag).then(() => {
      toast.success("<img> tag copied to clipboard.");
    }).catch(() => {
      toast.error("Failed to copy <img> tag.");
    });
  };

  return (
    <div className="text-justify font-semibold font-mono flex bg-slate-800 bg-opacity-80 rounded-xl p-4 shadow-lg gap-8 items-center justify-center w-[50vw] min-w-[600px] mx-auto">
      <button 
        onClick={exportMarkdown}
        className="flex gap-2 bg-slate-600 p-1 rounded-md items-center border-white border-[1px] min-w-[120px]">
        <Image src="/markdown.svg" alt="" width={20} height={20} />
        MARKDOWN
      </button>
      <button
        onClick={exportPNG}
        className="flex gap-2 bg-slate-600 p-1 rounded-md items-center border-white border-[1px] min-w-[120px]"
      >
        <Image src="/download.svg" alt="" width={20} height={20} />
        DOWNLOAD
      </button>
      <button 
        onClick={exportURL}
        className="flex gap-2 bg-slate-600 p-1 rounded-md items-center border-white border-[1px] min-w-[120px]">
        <Image src="/url.svg" alt="" width={20} height={20} />
        URL
      </button>
      <button 
        onClick={exportImg}
        className="flex gap-2 bg-slate-600 p-1 rounded-md items-center border-white border-[1px] min-w-[120px]">
        <Image src="/img.svg" alt="" width={20} height={20} />
        &lt;IMG /&gt;
      </button>
    </div>
  );
}