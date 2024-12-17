import { products } from "@wix/stores"
import { Label } from "./ui/label"

interface ProductOptions{
    product: products.Product,
    selectedOption: Record<string, string>,
    setSelectedOption: (option: Record<string, string>) => void
}

export default function ProductOptions({product, selectedOption, setSelectedOption}:ProductOptions){
    return(
        <div className="space-y2.5">
            {product.productOptions?.map(option => (
                <fieldset key={option.name} className="space-y-1.5">
                    <legend>
                        <Label asChild>
                            <span>{option.name}</span>
                        </Label>
                    </legend>
                    <div className="flex flex-wrap items-center gap-1.5">
                        {option.choices?.map(choice => (
                            <div key={choice.description}>
                                <input 
                                    type="radio"
                                    id={choice.description} 
                                    name={option.name}
                                    checked={selectedOption[option.name || ''] === choice.description}
                                    onChange={() => setSelectedOption({
                                        ...selectedOption,
                                        [option.name || '']: choice.description || ''
                                    })}
                                    value={choice.description}
                                    className="peer hidden"
                                />
                                <Label
                                    htmlFor={choice.description}
                                    className="flex rounded-md peer-checked:border-primary items-center justify-center min-w-40 cursor-pointer gap-1.5 border p-2"
                                >
                                    {option.optionType === products.OptionType.color &&(
                                        <span 
                                            className="size-4 rounded-full border"
                                            style={{ backgroundColor: choice.value}}
                                        />
                                    )}
                                    <span>{choice.description}</span>
                                </Label>
                            </div>
                        ))}
                    </div>
                </fieldset>
            ))}
        </div>
    )
}