import { useTheme } from 'styled-components'
import { Container, CardContainer, CardInfo, Code, Name, CardImage, Photo } from './styles'

function PokemonCard({ code, name, src, color, }) {
    const theme = useTheme()

    return (
        <>
            <Container color={theme.color.backgroundType[color ? color[0].type.name : 'transparent']}>
                <CardContainer>
                    <CardInfo>
                        <Code>#{code}</Code>
                        <Name>{name}</Name>
                    </CardInfo>

                </CardContainer>
                <CardImage>
                    <Photo src={src} />
                </CardImage>
            </Container>
        </>

    )
}
export default PokemonCard;