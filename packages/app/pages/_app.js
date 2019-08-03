import App, { Container } from 'next/app';
import Head from 'next/head';

import Layout from '../components/Layout';

class MyApp extends App {
    render() {
        const { Component } = this.props;
        return (
            <Container>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                        rel="stylesheet"
                    />
                    <title>DESC Project</title>
                </Head>
                <Layout>
                    <Component />
                </Layout>
            </Container>
        );
    }
}

export default MyApp;
