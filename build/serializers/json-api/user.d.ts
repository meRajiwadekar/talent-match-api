declare const _default: {
    name: string;
    schema: {
        data: {
            type(): string;
            id({ data }: {
                data: any;
            }): any;
            attributes({ data }: {
                data: any;
            }): {
                email: any;
                name: any;
                phoneNumber: any;
                termsAcceptedAt: any;
            };
        };
    };
};
export default _default;
