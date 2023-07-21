import {SnippetOperations} from "@/data/snippetOperations";
import {CreateSnippet, Snippet, SnippetDescriptor, UpdateSnippet} from "@/data/snippet";
import autoBind from "auto-bind";
import { getCookies, setCookie, deleteCookie } from 'cookies-next';

export class ActualSnippetOperations implements SnippetOperations {

    constructor() {
        autoBind(this)
    }

    headers = () => ({
        'Authorization': `Bearer ${getCookies()}`,
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