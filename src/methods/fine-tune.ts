import {
    FineTuneRequest,
    FineTuneResponse,
    RequestOptions,
} from "../../types";
import { makeModelRequest, Task } from "../requests/request";

/**
 * Tunes a model with custom data.
 * @param apiKey - API key for authentication.
 * @param baseModel - The base model to be fine-tuned.
 * @param tuneModelRequest - The request payload containing tuning parameters.
 * @param requestOptions - Optional request configuration.
 * @returns A promise resolving to the tuned model response.
 */
export async function finetune(
    apiKey: string,
    model: string,
    params: FineTuneRequest,
    requestOptions?: RequestOptions 
): Promise<FineTuneResponse> {

    const response = await makeModelRequest(
        model,
        Task.FINE_TUNE,
        apiKey,
        /* stream */ false,
        JSON.stringify(params),
        requestOptions,
    );
    const responseJson: GenerateContentResponse = await response.json();


    const response = await fetch(
        `https://api.generativemodels.com/v1/tune/${baseModel}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(tuneModelRequest),
            ...requestOptions,
        }
    );

    if (!response.ok) {
        throw new Error(`Failed to tune model: ${response.statusText}`);
    }

    return response.json();
}
