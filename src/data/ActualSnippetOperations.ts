import {SnippetOperations} from "@/data/snippetOperations";
import {CreateSnippet, Snippet, SnippetDescriptor, UpdateSnippet} from "@/data/snippet";
import autoBind from "auto-bind";
import { getCookies, setCookie, deleteCookie } from 'cookies-next';

export class ActualSnippetOperations implements SnippetOperations {

    constructor() {
        autoBind(this)
    }

    headers = () => ({
        'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Img1V2xFaTZjd2pxR2hYeGV3M1RwUCJ9.eyJpc3MiOiJodHRwczovL2Rldi03cW5vajZnMGJ2dzNmMnFzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NGI5MTA2MDI2Y2ZjMjNiOTczOWM0YmMiLCJhdWQiOiJodHRwczovL2luZy1zaXMtb3JnLXNuaXBwZXRzIiwiaWF0IjoxNjg5ODc2OTk4LCJleHAiOjE2ODk5NjMzOTgsImF6cCI6IlBhbTVaOEtKdnJBMWs5YmN6TnpnU1F1V3V2RTFxbXFlIiwiZ3R5IjoicGFzc3dvcmQifQ.EzCXFvLCO1k8Vv4awtYAonarzTGdj-SYCej89OyIp5krAbXrd2wY2cbJFk7ygDNiQQQej7zeMCyfUz8I2iiWiyZAz2-ks4ZHorS3ciAv0z4JRkHmbgTSNmlBNyGppAz7PFaHm8v8yWp31fniKTq4UAp2kv6ICX9NtM-81TFH_erGe4PV-5Z0lSg335IrB-oVVQikogDFo-4lvx7eTFpwHRJAVhfmmQtUmv65A7rDCfhfCj05nZ3gRcvLV2zulXMkuDVgr528ZHDXHldGGKD4RqrPI78mnIUEvL1vAIxXUSB1B9DG8fCg5_LFKcDdCExVLp9IMQ1cFVuvSwKBZJm1ww`,
        'Content-Type': 'application/json'
    })
    async createSnippet(createSnippet: CreateSnippet): Promise<SnippetDescriptor> {
        const response = await fetch('http://localhost:8081/snippet', {
            method: 'POST',
            headers: this.headers(),
            body: JSON.stringify({
                name: createSnippet.name,
                type: createSnippet.type.toLowerCase(),
                content: createSnippet.content
            })
        })
        const data = await response.json()
        return {
            id: data.snippet.id,
            name: data.snippet.title,
            type: data.snippet.language,
            compliance: data.snippet.compliance
        }
    }

    async getSnippetById(id: string): Promise<Snippet | undefined> {
        const data = await fetch('http://localhost:8081/snippet/' + id, {
            method: 'GET',
            headers: this.headers()
        }).then(response => {
            return response.json()
        })
        return {
            id: data.id,
            name: data.title,
            type: data.language,
            content: data.content,
            compliance: data.compliance
        }
    }

    async listSnippetDescriptors(): Promise<SnippetDescriptor[]> {
        console.log("update list")
        const data = await fetch('http://localhost:8081/all-snippets', {
            method: 'GET',
            headers: this.headers()
        }).then(response => {
            return response.json()
        })
        return data.map((snippet: any) => {
            return {
                id: snippet.id,
                name: snippet.title,
                type: snippet.language,
                compliance: snippet.compliance
            }
        })
    }

    async updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<SnippetDescriptor> {
        const data = await fetch('http://localhost:8081/snippet/' + id, {
            method: 'PUT',
            headers: this.headers(),
            body: JSON.stringify({
                content: updateSnippet.content
            })
        }).then(response => {
            return response.json()
        })
        return {
            id: data.snippet.id,
            name: data.snippet.title,
            type: data.snippet.language,
            compliance: data.snippet.compliance
        }
    }

}