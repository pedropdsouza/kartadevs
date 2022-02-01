import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import appConfig from './config.json';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js'
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'
import React from 'react';
import ListeningChat from '../src/components/ChatLive';
import Header from '../src/components/ChatHeader';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzUwMDg1NywiZXhwIjoxOTU5MDc2ODU3fQ.puCwUoHAzb-Ybk4OezivPMFg8iQmnthmbrZJ01RWnn8'
const SUPABASE_URL = 'https://mynqwberlcfnasgvugca.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

<ListeningChat />

export default function ChatPage() {

    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [message, setMessage] = React.useState('');
    const [PostList, setPostList] = React.useState([]);

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                //console.log('Dados da consulta:', data);
                setPostList(data);
            });

        const subscription = ListeningChat((newMessage) => {
            console.log('Nova mensagem:', newMessage);
            console.log('listaDeMensagens:', PostList);
            setPostList((valorAtualDaLista) => {
                console.log('valorAtualDaLista:', valorAtualDaLista);
                return [
                    newMessage,
                    ...valorAtualDaLista,
                ]
            });
        });
        return () => {
            subscription.unsubscribe();
        }
    }, []);

    function handleNewMessage(newMessage) {
        const message = {
            //id: listaDeMensagens.length +1,
            de: usuarioLogado,
            texto: newMessage,
        };
        supabaseClient
            .from('mensagens')
            .insert([
                message
            ])
            .then(({ data }) => {
                console.log('Criando mensagem ', data)
            });
        setMessage('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundImage: `url(https://images.pexels.com/photos/7862508/pexels-photo-7862508.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box

                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '75%',
                    maxWidth: '80%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >

                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                <MessageList mensagens={PostList} />

                <Box
                    as="form"
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                    }}

                    onSubmit={(infosDaMensagem) => {

                        if (message.length > 0) {
                            infosDaMensagem.preventDefault();
                            handleNewMessage(message);
                        } else {
                            infosDaMensagem.preventDefault();
                        }

                    }}
                >

                <TextField
                    value={message}
                    onChange={(event) => {
                        const valor = event.target.value;
                        setMessage(valor);
                    }}
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault();
                            handleNewMessage(message);
                        }
                    }}
                    placeholder="Insira sua mensagem aqui..."
                    type="textarea"
                    styleSheet={{
                        width: '100%',
                        border: '0',
                        resize: 'none',
                        borderRadius: '5px',
                        padding: '6px 8px',
                        backgroundColor: appConfig.theme.colors.neutrals[800],
                        marginRight: '12px',
                        color: appConfig.theme.colors.neutrals[200],
                    }}
                />

                <Button
                    type='submit'
                    label='Enviar'
                    styleSheet={{
                        width: '120px',
                        marginBottom: '5px',
                    }}
                    buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals["000"],
                        mainColor: appConfig.theme.colors.primary[500],
                        mainColorLight: appConfig.theme.colors.primary[400],
                        mainColorStrong: appConfig.theme.colors.primary[600],
                    }}
                />

                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                handleNewMessage(':sticker:' + sticker)
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

<Header />

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((message) => {
                return (
                    <Text
                        key={message.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${message.de}.png`}
                            />
                            <Text tag="strong">
                                {message.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>

                        {message.texto.startsWith(':sticker:')
                            ? (
                                <Image src={message.texto.replace(':sticker:', '')} />
                            )
                            : (
                                message.texto
                            )}
                    </Text>
                );
            })}
        </Box>
    )
}