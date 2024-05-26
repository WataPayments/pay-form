export type OptionType = {
    value: string
    label: string
}

export type InfoType = {
    uuid: string,
    agent_name: string,
    description: string,
    amount: number,
    sbp_url: string
    success_url: string | null
    methods: string[]
}