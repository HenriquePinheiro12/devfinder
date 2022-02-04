import { Box, Text, Icon, TextField, Button, Image } from "@skynexui/components"
import { useState, useRef } from "react"
import Pallete from '../config.json'

export default function Home () {
    const [theme, setTheme] = useState('dark')
    const [usernameInput, setUsernameInput] = useState('')
    const [userData, setUserData] = useState([])

    const inputText = useRef()
    // creates a reference to the alement


    const swapTheme = () => {
        setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(inputText.current.value)
    }

    return (
        <> 
           <main>
               <Box tag="section" styleSheet={{width: '800px', maxWidth: '90%'}}>
                    <Header theme={theme} swapTheme={swapTheme}/>
                    <SearchBar inputText={inputText} handleSubmit={handleSubmit} theme={theme}/>
                    {userData.map(val => {
                        // return <User ref={searchBar}/>
                    })}
               </Box>

           </main>
           <style jsx>{`
                main{
                    background: ${Pallete[theme]['primary-background']}
                }
           `}</style>
        </>
    )
}   


function Header(props){
    const [swapper, setSwapper] = useState({theme: 'light', iconName: 'FaSun'})

    const changeTheme = () => {
        setSwapper(() => {
            return (
            props.theme === 'dark' ? {theme: 'light', iconName: 'FaMoon'} :
            {theme: 'dark', iconName: 'FaSun'}
            )}
        )
        console.log(swapper)
        props.swapTheme()

    }

        return(
            <>
                <Box styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: Pallete[props.theme]['font-color']    
                }}>
                    <Text styleSheet={{fontWeight: 'var(--fw1)', fontSize: 'var(--fs1)'}}>
                        devfinder
                    </Text>
                    <Box styleSheet={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={changeTheme}>
                        <Text styleSheet={{
                            textTransform: 'uppercase', fontSize: 'var(--fs2)', marginRight: "var(--spc1)" 
                        }}>{swapper.theme}</Text>
                        <Icon size='16px' name={swapper.iconName}></Icon>
                    </Box>
                </Box>
            </>
        )
}

function SearchBar(props){
    const [input, setInput] = useState('')

    
    
    const handleInput = e => {
        setInput(e.target.value)
    }

    
    return (
        <>
            <Box styleSheet={{borderRadius: 'var(--brd-radius)', background: Pallete[props.theme]['secondary-background'], padding: 'var(--spc1)', margin: 'var(--spc3) 0', boxShadow: 'var(--bxs)' }}>
                <Box as="form" onSubmit={props.handleSubmit} styleSheet={{display: 'flex', alignItems:'center', justifyContent:'space-around'}}>
                    <Icon onSubmit={props.handleSubmit} size="24px" styleSheet={{
                        color: Pallete[props.theme]['accent-color'], transform: 'rotate(90deg)'
                    }} name="FaSearch"></Icon>
                    <input ref={props.inputText} styleSheet={{margin: '0 var(--spc1)', width: '100%'}} value={input} onChange={handleInput} variant="basicBordered"  type="text" placeholder="Search Github username" fullWidth textFieldColors={{
                        neutral: {
                            backgroundColor: 'transparent',
                            mainColor: 'transparent',
                            textColor: Pallete[props.theme]['font-color'],
                            mainColorHighlight: 'transparent'
                        }
                    }}></input>
                    <Button buttonColors={{contrastColor: 'none'}} type="submit" label="Search" styleSheet={{
                        background: Pallete[props.theme]['accent-color'], color: '#fff',
                        fontSize: 'var(--fs2)', borderRadius: 'var(--brd-radius)', 
                    }}></Button>

                    <style jsx>{`
                        input{
                            margin: 0 var(--spc1);
                            flex: 1;
                        }
                    `}</style>
                </Box>
            </Box>
        </>
    )
}