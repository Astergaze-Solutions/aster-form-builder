import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormElement } from "../form-types";


export const RenderRawElement = ({
    formElement,
}: {
    formElement: FormElement;
}): React.ReactElement => {
    switch (formElement.fieldType) {
        case 'Input':
            return (
                <div className="w-full">
                    <Label>
                        {formElement.label} {formElement.required ? ' *' : ''}
                    </Label>
                    <Input
                        placeholder={formElement.placeholder}
                        disabled={true}
                        type={formElement.type ?? 'text'}
                        defaultValue={formElement.defaultValue}

                    />
                    {formElement.description && (
                        <p className="text-sm text-muted-foreground">
                            {formElement.description}
                        </p>
                    )}
                </div>
            );
        case 'Password':
            return (
                <div className="w-full">
                    <Label>{formElement.label}</Label>
                    {formElement.required && ' *'}
                    <Input
                        placeholder={formElement.placeholder}
                        disabled={true}
                        type="password"
                        defaultValue={formElement.defaultValue}
                    />
                    {formElement.description && (
                        <p className="text-sm text-muted-foreground">
                            {formElement.description}
                        </p>
                    )}
                </div>
            );
        case 'Textarea':
            return (
                <div className="w-full">
                    <Label>
                        {formElement.label} {formElement.required && '*'}
                    </Label>
                    <Textarea
                        placeholder={formElement.placeholder}
                        required={formElement.required}
                        disabled={true}
                        defaultValue={formElement.defaultValue}
                        className="resize-none"
                    />
                    {formElement.description && (
                        <p className="text-sm text-muted-foreground">
                            {formElement.description}
                        </p>
                    )}
                </div>
            );
        case 'Checkbox':
            return (
                <div className="flex items-center gap-2 w-full py-1">
                    <Checkbox
                        disabled={true}
                    />
                    <Label className="leading-none">
                        {formElement.label} {formElement.required && ' *'}
                    </Label>
                    {formElement.description && (
                        <p className="text-sm text-muted-foreground">
                            {formElement.description}
                        </p>
                    )}
                </div>
            );
        case 'RadioGroup':
            return (
                <div className="flex flex-col gap-2 w-full py-1">
                    <Label className="mt-0">
                        {formElement?.label} {formElement.required && ' *'}
                    </Label>
                    <RadioGroup defaultValue={formElement.defaultValue}>
                        {formElement.options?.map(({ label, value }) => (
                            <div key={value} className="flex items-center gap-x-2">
                                <RadioGroupItem value={value} id={value} />
                                <Label htmlFor={value}>{label}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                    {formElement.description && (
                        <p className="text-sm text-muted-foreground">
                            {formElement.description}
                        </p>
                    )}
                </div>
            )
        case 'Switch':
            return (
                <div className="flex flex-col p-3 justify-center w-full border rounded">
                    <div className="flex items-center justify-between h-full">
                        <Label className="w-full grow">{formElement.label}</Label>
                        <Switch />
                    </div>
                    {formElement.description && (
                        <p className="text-sm text-muted-foreground">
                            {formElement.description}
                        </p>
                    )}
                </div>
            );
        case 'Slider':
            return (
                <div className="w-full">
                    <Label className="flex justify-between items-center">
                        {formElement.label}
                        <span>
                            {formElement.defaultValue}/{formElement.max}
                        </span>
                    </Label>
                    <Slider
                        min={formElement.min || 0}
                        max={formElement.max || 100}
                        step={formElement.step || 5}

                    />
                    {formElement.description && (
                        <p className="text-sm text-muted-foreground">
                            {formElement.description}
                        </p>
                    )}
                </div>
            );
        case 'Select':
            return (
                <div className="w-full">
                    <Label>
                        {formElement.label}
                        {formElement.required && ' *'}
                    </Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue
                                placeholder={formElement.placeholder || 'Select item'}
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {formElement.options?.map(({ label, value }) => (
                                <SelectItem key={label} value={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {formElement.description && (
                        <p className="text-sm text-muted-foreground">
                            {formElement.description}
                        </p>
                    )}
                </div>
            );
        case 'DatePicker':
            return (
                <div className="flex flex-col w-full gap-1">
                    <Label>
                        {formElement.label} {formElement.required ? ' *' : ''}
                    </Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button disabled variant="outline" className="w-full justify-start text-start font-normal">
                                <CalendarIcon className="mr-2 size-4" />

                                <span>Pick a date</span>

                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                onSelect={(newDate) => {
                                    // Handle date selection
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    {formElement.description && (
                        <p className="text-sm text-muted-foreground">
                            {formElement.description}
                        </p>
                    )}
                </div>
            );
        case 'H1':
            return (
                <h1
                    key={formElement.content}
                    className={cn('font-bold text-3xl', formElement.className)}
                >
                    {formElement.content}
                </h1>
            );
        case 'H2':
            return <h2 className="font-bold text-xl">{formElement.content}</h2>;
        case 'H3':
            return (
                <h3 className="font-semiboldbold text-lg">
                    {formElement.content} content
                </h3>
            );
        case 'P':
            return (
                <p className="tracking-wider text-foreground/60 pt-0 dark:text-foreground/60 mt-0 text-wrap">
                    {formElement.content}
                </p>
            );
        case 'Separator':
            return (
                <div className="py-3 w-full">
                    <Separator />
                </div>
            );
        default:
            return <div>Invalid Form Element</div>;
    }
};