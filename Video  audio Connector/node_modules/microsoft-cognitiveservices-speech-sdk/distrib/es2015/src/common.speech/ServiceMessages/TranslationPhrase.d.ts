import { IPrimaryLanguage, ITranslations, RecognitionStatus } from "../Exports";
export interface ITranslationPhrase {
    RecognitionStatus: RecognitionStatus;
    Offset: number;
    Duration: number;
    Translation?: ITranslations;
    Text: string;
    DisplayText?: string;
    PrimaryLanguage?: IPrimaryLanguage;
}
export declare class TranslationPhrase implements ITranslationPhrase {
    private privTranslationPhrase;
    private constructor();
    static fromJSON(json: string): TranslationPhrase;
    static fromTranslationResponse(translationResponse: {
        SpeechPhrase: ITranslationPhrase;
    }): TranslationPhrase;
    get RecognitionStatus(): RecognitionStatus;
    get Offset(): number;
    get Duration(): number;
    get Text(): string;
    get Language(): string;
    get Confidence(): string;
    get Translation(): ITranslations;
}
