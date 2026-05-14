Use this MUI component
https://mui.com/material-ui/react-autocomplete/#grouped

Link to the figma mockup
https://www.figma.com/design/LPgbeJJGzYgkXUouYwrXKS/GPW-Design-File?node-id=4496-27573&t=3TsLdhr1zjPGKne8-4

## Specifications for region selector

- Default to Global
- The user clicks the controls and can type to search for a country or region
- Selecting a country or region adds it to the breadcrumb. So now the state will be `Global > {country or region}`
- Clicking global takes the use back to Global
- For the mockup, if the user clicks the map, add `Watershed` to the breadcrumb. So now the state will be `Global > {Country or region} > Watershed`
- If the user is on a watershed, then they can click on the country or region to return to that country or region
- There should be one dropdown at the right of the compoent that opens the type-to-search
- On the left side there should be a up-level arrow that takes the user up one level. From watershed to country/region, or from country/region to global.

Keep the year selector as is.

## Layout updated

- Add a top bar
- Put the logo in the left of the top bar
- Make the panels float with a little gap
- Put the animations back in
- put the breadcrumb/year selector in the top right of the top bar
