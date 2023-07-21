import {SnippetOperations} from "@/data/snippetOperations";
import {CreateSnippet, Snippet, SnippetDescriptor, UpdateSnippet} from "@/data/snippet";
import autoBind from "auto-bind";
import { getCookies, setCookie, deleteCookie } from 'cookies-next';

export class ActualSnippetOperations implements SnippetOperations {

    constructor() {
        autoBind(this)
    }

    headers = () => ({
        'Authorization': `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Img1V2xFaTZjd2pxR2hYeGV3M1RwUCJ9.eyJpc3MiOiJodHRwczovL2Rldi03cW5vajZnMGJ2dzNmMnFzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NDkwZGU2NzhiODVjOGE2OTQ5ZjkzOTkiLCJhdWQiOiJodHRwczovL2luZy1zaXMtb3JnLXNuaXBwZXRzIiwiaWF0IjoxNjg5OTY4Mzg1LCJleHAiOjE2OTAwNTQ3ODUsImF6cCI6IlBhbTVaOEtKdnJBMWs5YmN6TnpnU1F1V3V2RTFxbXFlIiwiZ3R5IjoicGFzc3dvcmQifQ.eqtjI9K4ChsKB0isBCeWN0gLsDy_zU0wrFD8QkNyf1y8FI8IwghMNuVqkvcKCWRuspuGAO4U2Gx6fE7Senu947tUXWb8QQ-EQ3AJJi0tS9qGXUoCXfioKfekeQZdv7e3T-6n0cGlohhMnpwhTKqE9x5T6YWBtxBFUf8iAWlzKDm4gCHV3e50FBAFVecoKdVMwdEnmmkYj4T1D06lbg3BNkhoJCEoEBX05h_a20pMJzTQD6VmN7tVJMKnOCxCNXB3XUYlK2jOojBcASgG0zzAF-wn-7pcazHbiJ1_gmMnHvKCfDJLE5FN14SX4XBJhga879TMUV_7yO3FgA6IHr96Og`,
        'Content-Type': 'application/json'
    })

    serverurl = () => 'https://ing-sis-org.casacam.net/snippet-manager'
    async createSnippet(createSnippet: CreateSnippet): Promise<SnippetDescriptor> {
        const response = await fetch(this.serverurl() + '/snippet', {
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
        const data = await fetch(this.serverurl() + '/snippet/' + id, {
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
        const data = await fetch(this.serverurl() + '/all-snippets', {
            method: 'GET',
            headers: this.headers()
        }).then(response => {
            return response.json()
        })
        return data.map((snippet: any) => {
            console.log(snippet)
            return {
                id: snippet.id,
                name: snippet.title,
                type: snippet.type,
                compliance: snippet.compliance
            }
        })
    }

    async updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<SnippetDescriptor> {
        const data = await fetch(this.serverurl() + '/snippet/' + id, {
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