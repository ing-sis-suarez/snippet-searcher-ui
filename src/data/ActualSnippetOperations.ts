import {SnippetOperations} from "@/data/snippetOperations";
import {CreateSnippet, Snippet, SnippetDescriptor, UpdateSnippet} from "@/data/snippet";

// export class ActualSnippetOperations implements SnippetOperations {
//     createSnippet(createSnippet: CreateSnippet): Promise<SnippetDescriptor> {
//         return Promise.resolve(undefined);
//     }
//
//     getSnippetById(id: string): Promise<Snippet | undefined> {
//         return Promise.resolve(undefined);
//     }
//
//     listSnippetDescriptors(): Promise<SnippetDescriptor[]> {
//         return Promise.resolve([]);
//     }
//
//     updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<SnippetDescriptor> {
//         return Promise.resolve(undefined);
//     }
//
// }