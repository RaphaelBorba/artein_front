import Image from "next/image";

interface PrintHeaderProps {
    title: string;
}

export default function PrintHeader({ title }: PrintHeaderProps) {
    return (
        <div className="print-header hidden print:flex flex-col items-center justify-center border-b border-gray-300 pb-4 mb-6">
            <Image
                src="/logo.jpeg"
                alt="ArteIn - Centro de Artes e Terapias Integradas"
                width={120}
                height={120}
                className="mb-2"
            />
            <h1 className="text-xl font-semibold text-gray-800 text-center">{title}</h1>
        </div>
    );
}

