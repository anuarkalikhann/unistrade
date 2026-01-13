
import re

file_path = '/Users/anuar/Downloads/secondoption/src/constants/pricingRules.ts'

with open(file_path, 'r') as f:
    content = f.read()

# Pattern to find the unaccounted object.
# We look for an object that has pricePerUnit: 1 and label containing 'Неучтенка'.
# We capture the section line to reuse it.

pattern = r"""(
\s*\{\s*
\s*id:\s*['"]\w+['"],\s*
\s*section:\s*(['"][^'"]+['"]),\s*
\s*label:\s*['"]Неучтенка[^'"]*['"],\s*
\s*type:\s*['"]number['"],\s*
\s*priceType:\s*['"]quantity['"],\s*
\s*pricePerUnit:\s*1,\s*
\s*unit:\s*['"][^'"]+['"]\s*
\s*\},?)
"""

# Regex replacement function
def add_discount(match):
    original_block = match.group(1)
    section_name = match.group(2)
    
    discount_block = f"""
            {{
                id: 'discount',
                section: {section_name},
                label: 'Скидка',
                type: 'number',
                priceType: 'quantity',
                pricePerUnit: -1,
                unit: 'сом'
            }},"""
    
    return original_block + discount_block

# Use re.VERBOSE to allow comments and whitespace in pattern
# We assume standard formatting as seen in file view. 
# Adjust pattern to be more flexible with whitespace if needed.

# Let's try a regex that matches the whole block structure more loosely
regex = re.compile(r"(\s*\{\s*id:\s*['\w]+,\s*section:\s*(['][^']+[']),\s*label:\s*[']Неучтенка[^']*['],\s*type:\s*[']number['],\s*priceType:\s*[']quantity['],\s*pricePerUnit:\s*1,\s*unit:\s*['][^']+[']\s*\}(?:,)?\s*)")

new_content = regex.sub(add_discount, content)

# Check if any changes were made
if new_content == content:
    print("No changes made. Pattern might not match.")
    # Debug: print a snippet of original to see why
    import sys
    sys.exit(1)

with open(file_path, 'w') as f:
    f.write(new_content)

print("Successfully added discount option.")
