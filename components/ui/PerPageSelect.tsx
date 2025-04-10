import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/Select";

type Props = {
    value: number;
    onChange: (value: number) => void;
};

const options = [5, 10, 20, 50];

export default function PerPageSelect({ value, onChange }: Props) {
    return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Users per page:</span>
            <Select value={String(value)} onValueChange={(v) => onChange(Number(v))}>
                <SelectTrigger className="w-20 h-8">
                    <SelectValue placeholder={value} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((opt) => (
                        <SelectItem key={opt} value={String(opt)}>
                            {opt}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}