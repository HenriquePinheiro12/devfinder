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
        setApiRes(userJson)
    }

    return (
        <> 
           <main>
               <Box tag="section" styleSheet={{width: '800px', maxWidth: '90%', margin: 'var(--spc3) 0'}}>
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

// todo: fix setSwapper logic
function Header(props){
    const [swapper, setSwapper] = useState(() => { // button to change the theme
        return props.theme === 'dark' ? 
        ({theme: 'light', iconName: 'FaSun'}) :
        ({theme: 'dark', iconName: 'FaMoon'})
    })

    function changeTheme (){
        props.swapTheme() //changes main component´s theme state
        setSwapper(() => {
            return props.theme === 'dark' ? 
            ({theme: 'dark', iconName: 'FaMoon'}) :
            ({theme: 'light', iconName: 'FaSun'}) 
        })
        

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
    
    const getDate = (date) =>{
        const primitiveDate = new Date(date)
        const formatedDate = primitiveDate.toLocaleString('en', {day: '2-digit', month: 'short', year:'numeric'})
        return 'Joined '+ formatedDate 
    } 

    return (
        <>
            <Box styleSheet={{background: Pallete[theme]['secondary-background'], borderRadius: 'var(--brd-radius)', padding: 'var(--spc3)', boxShadow: 'var(--bxs)'}}>
                {/* Heading */}
                <Box styleSheet={{display: 'flex',alignItems: 'flex-start', margin: 'var(--spc2) 0'}}>
                    <Image src={user['avatar_url']} alt={user.login} styleSheet={{
                        borderRadius: '50%', width:'15%', marginRight: 'var(--spc3)'
                    }}/>
                    {/* flex-wrap */}
                    <Box styleSheet={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', flex: '1', alignItems:'baseline'}}>
                        <Box>   
                            <Text tag="h2" styleSheet={{
                                color: Pallete[theme]['font-color'], fontWeight: 'var(--fw1)',
                                fontSize: {
                                    sm: 'var(--fs1)',
                                    xs: 'var(--fs2)'
                                },
                                wordWrap: 'break-word', flexWrap: 'wrap', marginRight: 'var(--spc1)'
                            }}>
                                {user.name}
                            </Text>
                            <a target='_blank' href={user['html_url']}>
                                <Text href={user['html_url']} styleSheet={{color: Pallete[theme]['accent-color'], margin: 'var(--spc1) 0'}}>
                                    {'@'+user.login}
                                </Text>
                            </a>
                        </Box>
                        <Text tag="span" styleSheet={{
                            color: Pallete[theme]['opaque-color'], fontSize: 'var(--fs3)'
                        }}>
                            {getDate(user['created_at'])}
                        </Text>

                    </Box>                  
                </Box>
                {/* Status */}
                <Box styleSheet={{color: Pallete[theme]['font-color'], marginLeft: {md: 'auto'}, width:{
                    md: '80%'
                }}}>
                    {/* Bio */}
                    <Text type='p' styleSheet={{lineHeight: '1.5rem', maxWidth: {md: '90%'}, color: (Boolean(!user['bio']) && Pallete[theme]['opaque-color'])}}>
                        {user['bio'] || 'This user has no bio'}
                    </Text>

                    {/* Analitcs */}
                    <Box
                    styleSheet={{margin:'var(--spc3) 0',background: Pallete[theme]['primary-background'], borderRadius: 'var(--brd-radius)', display: 'flex', alignItems: 'center', justifyContent:'space-around', color: Pallete[theme]['font-color'], padding:'var(--spc2)'}}>
                            <Box>
                                <Text styleSheet={{fontWeight: 'var(--fw2)', fontSize:'var(--fs3)'}}>
                                    Repos
                                </Text>
                                <Text styleSheet={{fontWeight: 'var(--fw1)', fontSize:'var(--fs1)'}}>
                                    {user['public_repos']}
                                </Text>
                            </Box>

                            <Box>
                                <Text styleSheet={{fontWeight: 'var(--fw2)', fontSize:'var(--fs3)'}}>
                                    Followers
                                </Text>
                                <Text styleSheet={{fontWeight: 'var(--fw1)', fontSize:'var(--fs1)'}}>
                                    {user['followers']}
                                </Text>
                            </Box>

                            <Box>
                                <Text styleSheet={{fontWeight: 'var(--fw2)', fontSize:'var(--fs3)'}}>
                                    Following
                                </Text>
                                <Text styleSheet={{fontWeight: 'var(--fw1)', fontSize:'var(--fs1)'}}>
                                    {user['following']}
                                </Text>
                            </Box> 

                    </Box>

                    {/* Others */}
                    <Box styleSheet={{display: 'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px,1fr))', gap:'var(--spc2)', margin: 'var(--spc2) 0'}}>

                       <Link theme={theme} name='FaMapMarker' data={user['location']} />
                       
                       <Link theme={theme} name='FaTwitter' data={user['twitter_username']} />
                       
                       <Link theme={theme} name='FaLink' data={user['blog']} />
                       
                       <Link theme={theme} name='FaBuilding' data={user['company']} />
                                            
                    </Box>
                </Box>

            </Box>
        </>
    )
}


function Link({theme, name, data}){
    return (
        <>
            <Box styleSheet={{display: 'flex', alignItems:'center', color: Boolean(data) ?  Pallete[theme]['font-color'] : Pallete[theme]['opaque-color']}}>
                <Icon styleSheet={{marginRight:'var(--spc2)'}} name={name}/>
                <Text>
                    {data || 'Not Available'}
                </Text>
            </Box>
        </>
    )
}