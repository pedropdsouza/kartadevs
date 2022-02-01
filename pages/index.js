import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from './config.json';
import Title from '../src/components/Title';

<Title />

export default function PaginaInicial() {
    const [username, setUsername] = React.useState('marcosh72');
    const roteamento = useRouter();

    return (
        <>

            <Box
            
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage: 'url(https://images.pexels.com/photos/9072394/pexels-photo-9072394.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
                }}
            >
            
            <Box
                styleSheet={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: {
                        xs: 'column',
                        sm: 'row',
                    },
                    width: '100%', maxWidth: '700px',
                    borderRadius: '5px', padding: '32px', margin: '16px',
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    backgroundColor: appConfig.theme.colors.neutrals[888],
                    
                    }}
      
            >
              

                    {/* Formulário */}
            <Box
                    as="form"
                    onSubmit={function (infosDoEvento) {
                        infosDoEvento.preventDefault();
                        console.log('Alguém submeteu o form');
                        roteamento.push(`/chat?username=${username}`);                        
                        }}
                        
                    styleSheet={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                        
            >
                        <Title tag="h2">Kartadevs</Title>
                          
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', marginTop: '5px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>                      
                       

            <TextField
                    value={username}
                        onChange={function (event) {
                        console.log('usuario digitou', event.target.value);
                        const valor = event.target.value;
                        setUsername(valor);
                    }}
                    fullWidth
                        textFieldColors={{
                        neutral: {
                                 textColor: appConfig.theme.colors.neutrals[888],
                                 mainColor: appConfig.theme.colors.neutrals[900],
                                 mainColorHighlight: appConfig.theme.colors.primary[500],
                                 backgroundColor: appConfig.theme.colors.neutrals[777],
                                },
                            }}
             />

             <Button
                    
                    type='submit'
                    label='Entrar'
                    fullWidth
                    buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals["000"],
                        mainColor: appConfig.theme.colors.primary[500],
                        mainColorLight: appConfig.theme.colors.primary[400],
                        mainColorStrong: appConfig.theme.colors.primary[600],
                        }}
             />
                        
             </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
             <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: '200px',
                        padding: '16px',
                        backgroundColor: appConfig.theme.colors.neutrals[888],
                        border: '1px solid',
                        borderColor: appConfig.theme.colors.neutrals[999],
                        borderRadius: '10px',
                        flex: 1,
                        minHeight: '240px',
                        }}
              >
              
              <Image

                        styleSheet={{
                        borderRadius: '50%',
                        marginBottom: '16px',
                        }}
                        src={`https://github.com/${username}.png`}
               />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}