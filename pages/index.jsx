import { Box, Text, Icon, TextField, Button, Image } from "@skynexui/components"
import { useState, useRef } from "react"
import Pallete from '../config.json'

export default function Home () {
    const [theme, setTheme] = useState('dark')
    const [usernameInput, setUsernameInput] = useState('')
    const [apiRes, setApiRes] = useState()

    const inputText = useRef()
    // creates a reference to the alement


    const swapTheme = () => {
        setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const username = inputText.current.value
        const userJson = 
            await fetch(`https://api.github.com/users/${username}`)
                    .then(res => res.json())
        console.log(userJson)
        setApiRes(userJson)
    }

    return (
        <> 
           <main>
               <Box tag="section" styleSheet={{width: '800px', maxWidth: '90%'}}>
                    <Header theme={theme} swapTheme={swapTheme}/>
                    <SearchBar inputText={inputText} handleSubmit={handleSubmit} theme={theme}/>

                    {Boolean(apiRes) ? 
                        (Boolean(apiRes.message) ? 
                            <Error theme={theme}/> : <UserData theme={theme} user={apiRes}/>
                        ) : 
                        null
                    }
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
                <Box as="form" onSubmit={e => {
                    props.handleSubmit(e)
                    setInput('')
                    }} styleSheet={{display: 'flex', alignItems:'center', justifyContent:'space-around'}}>
                    <Icon onSubmit={props.handleSubmit} size="24px" styleSheet={{
                        color: Pallete[props.theme]['accent-color'], transform: 'rotate(90deg)'
                    }} name="FaSearch"></Icon>
                    <input ref={props.inputText} value={input} onChange={handleInput} type="text" placeholder="Search Github username"></input>
                    <Button buttonColors={{contrastColor: 'none'}} type="submit" label="Search" styleSheet={{
                        background: Pallete[props.theme]['accent-color'], color: '#fff',
                        fontSize: 'var(--fs2)', borderRadius: 'var(--brd-radius)', 
                    }}></Button>

                    <style jsx>{`
                        input{
                            margin: 0 var(--spc1);
                            flex-basis: 80%;
                            height: 100%;
                            background: transparent;
                            border: none;
                            outline: 0;
                            color: ${Pallete[props.theme]['font-color']};
                            padding: 0 var(--spc1)
                        }
                    `}</style>
                </Box>
            </Box>
        </>
    )
}

function Error(props){
    return (
        <>
            <Box styleSheet={{
                 borderRadius: 'var(--brd-radius)', display: 'flex', alignItems: 'center', color: Pallete[props.theme]['font-color'],
                 flexDirection: 'column'
            }}>
                <Text variant="heading2">
                    No user found!
                </Text>
                <Icon size='20px' name="FaRegWindowClose"></Icon>
            </Box>
        </>
    )
}

function UserData({user, theme}){
    return (
        <>
            <Box styleSheet={{background: Pallete[theme]['secondary-background'], borderRadius: 'var(--brd-radius)', padding: 'var(--spc3)'}}>
                {/* Heading */}
                <Box styleSheet={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <Image src={user['avatar_url']} alt={user.login} styleSheet={{
                        borderRadius: '50%', width:'25%'
                    }}/>
                    <Box>
                        <Box>
                            {/* flex-wrap */}
                            <Text tag="h2" styleSheet={{
                                color: Pallete[theme]['font-color'], fontWeight: 'var(--fw1)',
                                fontSize: 'var(--fs1)',
                                wordWrap: 'break-word'
                            }}>
                                {user.name}
                            </Text>
                            <a target='_blank' href={user['html_url']}>
                                <Text href={user['html_url']} styleSheet={{color: Pallete[theme]['accent-color']}}>
                                    {'@'+user.login}
                                </Text>
                            </a>
                        </Box>
                    </Box>                  
                </Box>
            </Box>
        </>
    )
}