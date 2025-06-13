export type typeNotification = (msg: string, description ?: string) => void
export type IdeaListingParam = {orderBy: "most_voted" | "latest", titleSearch: string}