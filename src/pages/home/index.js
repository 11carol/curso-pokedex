import React, {useState, useEffect} from 'react'
import { CardContainer, HomeContainer } from './styles'
import Background from '../../components/Background'
import Navbar from '../../components/Navbar'
import PokemonCard from "../../components/PokemonCard"
import api from '../../services/api'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '../../components/Loading'

//ReactStrictMode
 
function Home() {
    const [isLoading, setIsLoading] = useState([false])
    const [pokemonName, setPokemonName] = useState([])
    const [pokemonInfo, setPokemonInfo] = useState([])
    const pokemonLimit = 20
    const [pokemonOffSet, setPokemonOffSet] = useState(pokemonLimit)
// .then serve para falar pra aplicação esperar a aplicação e depois continuar
// .sort para ordenar
    const handleGetPokemonName = ( // essa função so pega os nomes dos pokemons
            async () => {
                try {
                    setIsLoading(true)

                    const response = await api.get('pokemon', {
                        params: {
                            limit: 20,
                        },
                    })
                    if (response) {
                        setPokemonName(response.data.results)
                        handleGetPokemonStats(response.data.results)
                    }
                } catch (error) {
                    console.log(error)
                } finally {
                    setIsLoading(false)
                }
            })

    const handleGetPokemonStats = (pokemons) => { // essa função pega so os status
        //.then faz com que não seja preciso usar a função assincrona, no caso se ele encontra algum pokemon ai ele roda a função
        // result é um objeto
        try{
            pokemons.map((pokemon) =>
                api.get(`/pokemon/${pokemon.name}`).then((response) => {
                    const result = response.data
                    setPokemonInfo((prevState) => // se usasse so result dentro deste set, ia trazer so um pokemon,
                    // ja com o prevState ele vai pegar um por um mais diferente do result ele vai somar 
                        [...prevState, result].sort((a, b) => {
                            return a.id - b.id
                            //se não colocar o ... antes de prevState, ele ignora a camada de array para não ficar muito repetitivo, mas sim uniforme
                        })
                    )
                })
            )
        } catch (error) {
            console.log(error) 
            
        } finally {
            setIsLoading(false)
        }

    } 
    
    async function handleLoadNewPokemons() {
        try {
            setIsLoading(true)
            const response = await api.get('pokemon', {
                params: {
                    limit: pokemonLimit,
                    offset: pokemonOffSet
                }
            })
            if (response) {
                setPokemonName((prevState) => [...prevState, ...response.data.results])
                handleGetPokemonStats(response.data.results)
                setPokemonOffSet((prevState) => prevState + pokemonLimit)
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

//useEffect roda quando a tela nascer
    useEffect(() => {
        handleGetPokemonName()
    }, [])    // roda so uma vez porque esta em um useEffect vazio


    return (
        <div>
            <InfiniteScroll 
            dataLength={pokemonInfo.length}
            next={handleLoadNewPokemons}
            hasMore={isLoading ? false : true}
            scrollThreshold={0.9}
            style={{ overflow: 'hidden'}}
            >

                <Background />
                <HomeContainer>
                    <Navbar />
                    <CardContainer>

                        {
                            isLoading ? <Loading /> : <></>
                        }
                        {pokemonInfo && (
                            pokemonName.map((pokemon, index) =>
                                <PokemonCard key={index} code={pokemonInfo[index]?.id} name={pokemon?.name} src={pokemonInfo[index]?.sprites?.other['official-artwork']?.front_default} color={pokemonInfo[index]?.types} />
                            )
                        )
                        }
                    </CardContainer>
                </HomeContainer>
            </InfiniteScroll>


        </div>
    )
}
export default Home