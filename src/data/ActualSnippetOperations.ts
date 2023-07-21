import {SnippetOperations} from "@/data/snippetOperations";
import {CreateSnippet, Snippet, SnippetDescriptor, UpdateSnippet} from "@/data/snippet";
import autoBind from "auto-bind";
import { getCookies, setCookie, deleteCookie } from 'cookies-next';

export class ActualSnippetOperations implements SnippetOperations {

    constructor() {
        autoBind(this)
    }

    headers = () => ({
        'Authorization': `Bearer eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwidWF0IjoxNjg5OTY2MzY2LCJpYXQiOjE2ODk5NjYzNjQsImV4cCI6MTY5MDA1Mjc2Nn0..V2FOpezx2iNCGSgo.zoOb6AMZle23NLkZQsrdTYWaU0iBGk-s-4dm31KjMsD38evAow86FDksO18VaJJIbWgv9RlUR3lzgj1aC0iyLAZn166sK4AYHp-p8N3SXkhX-tHLoXR5vuHK-FaUBtssPKXaIlkCL9i59-CBRz-MI-WHKNImbVdeML7FqxqMQNvWElTOnmbyVz4ubzt6IYjgyDceqiSxea3pJqZrNSPnX7bUw3AFo9yyscJWLrwDegF-oBX1TdYrl5PgzEoQWZRehgYD1v0MjlrYeAuY8M_P_6Jc_dX-aog6Icisv0OJH4IB0wcTEKnXLX5wZUMi1UFViP2CwJYiPyqFDl3CQISo19dLUzild4-zOhDvTFwsTcu6IohdE01N8n2rPwC9NJiiEBGZA2h0w8SSUWRaQUS3lMn6Z1zaa6_1rMTXy5gZyaJxcmn7cWQ7JsANQ8rBn9aRpDdhDxsydL5ykwU-t8NAvnk8cqIyeyr3ka63dOoVVthoZYluz2xDdH28Jb4MZIpXuDfxgU5Y448tiZPryrgLSySNycEJycxPHEn5E4VCSq8coigA8wZ7wZ6ZZvVd_t-9nIprltuOpEAKJVMFPWxcKXx-DRVVm_OypFo4byK7f0vDF-sAlT-dh2LYRw73_22sDt0u3xiDYdaqO4ZrCLNU95-0W5hR6sJGpgzJnWRXsGzjs-YEJfgRJVMkiBHoQz1IsTJ1LtD8cfCnSSdi5Uhp7ja9a3GiNvBQP9vckMMsVJfaq7_V1e7oMwt_lU8GlGciBZuszra3mshtRAEuav4bwdT5GaQx-okWtWo8yo0UMrfJLQmKZx4QHmui4FRby7aXGdTRD0eskO5M2lC71YZU4fOQ0nq9oSffcCFZO0ea6pj0UT8CQyOFSAe9u15OW2FtIAITJU70tlhHe36RL1Gj6OJ2v5IlfYT-ZKMRYXGfcCbvzVt_xR1wIPYZSzjRVnuj__PzpGGL75XW-I8DyHKBePvluKpk4moGfor6og88wRJUXB-sgTNAlbHhEAzZUIOBI1zQ-TkVX9T2iYWS1j0mq-99nKuDlo8-9Lz1_36D_XGyI2cQ6yHZUIOC8kkqM1XJXMKJ--u3KO1Ygm8W1F136KtAlRxL6ZtnjHgHSDKi36GznwOgPxG3DxW_fEKwEt1k6gKp6A4SrdyCz86D7QPEdkOF7dtT4khqDeFQnraLduMGwBzkfx-7KARi-9W_2VL9jfReGXJmtzdZw6_KeOJy3ZFFHE2f7gimfZDDf3kv2Cvd9I0y7KU40h5xmXaMXdh9nrU0qWJ-FizABTPMe7vvT0DvfRd5n-SzZix5sRJ2d2ae2vcMkKEjOVFCzFdpRKqC8p6scogowCcGrWGjYvbrppj5tM3yPw_FmUTIhiWGOyDvAUXcOt33-WbHzxdBEQ-OkKUr0bcx1IYsWdwEv9PAO3by2ulyPMQViH2oBS6B-qWz1fQe0a7cjnGT7vE5Qkwmw4zeTUSouw9JyQL0uesqxC5nNH3jqQb8CFZuK65PWrWCXWyO9vSHhEls9mie6d932LE_ykHm6lXo-RwiZTnRrs9p69sbNQzpTnulhLzmwx7gWyYQS87Rl4-NhcPhQuSkz85IWSpiY67t9csHLuw_fenaFSpM4u7Y4NYkENeWT5j3GZBP2-GFOeZU0xl_pUugbeAHxe7IYQz7-GDw2Q4hWoIgUwDC1sx_9lBXrAjLje9GRavrVXCx_bSS6nEcgROjmGJ6v18Opv1fMIo5Px6xHHsfHaIyvZ71NoY_8meX6LFSee_iHW4Jl2cZMSwczFtmZAWsNI6KtisSd_6zFo0Pqh5J1vUZUR7K9Mo2IN6kEhTWxt92Km1J66v4E2lTRTIjF0wVJ-O-R1YrgbbvVLFIulThKWv9Az2HtHShuMrxJd0zu8NFljzqkNgG5_C1RXHwhSD6qTpSQcNyHdD0Gpva0FyN1zk-IBxCvwUSzs7AwwVF-nZWf0HviOTFw3KrTixufSYIY5o6IpLK_DhWaYK6dYjptbkmorf1XWpSkLMsCjJtf_L5UFmCCDirY85Ht1EFW2uusrrMoQCfCVy_lVHNiahO1nodUUof1-fvgKNyp9upoCRowVZD4WIN-br6U6zCjxahdAYY15R3g-i16fVl5IA94xAVq_lStt-FXjc7-6GI5Mh3ZxfNeu7APDH7UwK8pQJV5mvGwmTrC6tKqBkDAxFvDxo4AO7sf48JAzHMDhW6cCQO86sD2T_vLITPhJfvFILwYy2sP7t4b1CqYialMYOvcWZvu7cfJisWuBwDGzICsh1KZIuWGwGcf_TUb_plTDX298JA7eu60BorQvX3zA8HmX9V4gtHYz_GMIxEAR20kd2bCMPQgRYyhXAAV_gMh0lbyxEqwu5CryueSEsVfEza-ZDsd8_uMJbsrdJLksKu9AWvYdBf1aXVOSJhbj2dhGOagFQnJMpxujBxX0O4ln5Y4SgaUBPKhVVTHYf_1--k3AcXW7r2CF6iFjrYbvX_lce0Kqy3dgKpZj7hknrs__NsSDIA8RStqhLLAxRsNMx9fsrKKhJsNESvjm-xxVclyehlyZBIbXlQ_sM6yaMP75BWxRlb6ocQQW36VW0ZJZMzxyi6qtR7R75CCVsxuaPjuKYC8hyV46i0I3aFEwxA82dnBt9cv1whSjcwJM1rOIY2k9VzA8PXZE6J771moPY5xbSxV7ntVUVs08Gr-9TeN6aN2TvpiUT05UEt2j5AGkPAF7kpCx31PBq1GtxBHNj-hYf5xTUd82jH41H2Vdlyk4JseJP4tn64Zk4W2wOakFUX-EgHwW4OtBEwPtxWsgiV9c9v6Yox31cxem-DKwqC2hT6QQe4URL9jBKngA1rub5hbFw_tqYqrRC4Mno3yHJv4sQlgI8owDZyUivIwURYSM10nYsvrr2NJ7e3RKhC83Uvasv8bNHutKzY1NgoxifkiZ94BX4qml4htrr5-xJniyafOdOjkmK78_QgikSj0PNAVlytgAcw8Fr_JX5il4BeCZDCOhwfHBSC_6aA2i1X6RTuJLiQ68LBLEmrF_WyInf8eCGfRH6SDSFsV24Ky4A-whpSYQ.P07wtk2soCX-y_sDobdlaQ`,
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