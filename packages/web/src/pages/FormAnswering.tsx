import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../components/Form";

function FormAnswering()
{
    const form = useForm()

    function handleSubmit(data: any)
    {
        console.log(data)
    }

    return <div className="px-8 py-4">
        <h1 className="text-2xl font-bold uppercase">Formulário minha história</h1>
        <h2 className="text-xl font-semibold">Mentoria Cura e Crescimento com Nuno Machado</h2>
        <p className="text-sm">Seja muito bem-vinda(o) ao formulário “Minha História”. Neste importante e fundamental formulário tu irás responder importantes dados e questões sobre a tua história, tua essência e tua jornada na vida até aqui. Tu encontrarás algumas questões muito profundas que peço que tu respondas com tempo no máximo nível de detalhes que puder. Quanto mais completas forem tuas respostas, mais rica e assertiva será tua jornada na Mentoria Cura e Crescimento! 😉</p>
        <p className="text-sm">Para preencher este formulário eu sugiro que tu consideres de 2 a 3h. Não é necessário que tu respondas em um dia, porém é muito importante que tu quando estiver respondendo responda com muita presença. Medite antes, conecte-se consigo e registre com muito amor aqui todas as respostas sobre a tua história de vida até aqui. Bom formulário! ❤️🙏🏻</p>
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Form.Field>
                    <Form.Label>Qual seu nome completo?</Form.Label>
                    <Form.Input type="text" name="complete-name" />
                    <Form.ErrorMessage field="complete-name" />
                </Form.Field>
                <Form.Field>
                    <Form.Label>Qual sua data de nascimento?</Form.Label>
                    <Form.Input type="date" name="birth-date" />
                    <Form.ErrorMessage field="birth-date" />
                </Form.Field>
                <Form.Field>
                    <Form.Label>Qual seu horário de nascimento?</Form.Label>
                    <Form.Input type="time" name="birth-time" />
                    <Form.ErrorMessage field="birth-date" />
                </Form.Field>
                <h1>Local de nascimento</h1>
                <div className="grid grid-flow-col gap-x-1">
                    <Form.Field>
                        <Form.Label>País</Form.Label>
                        <Form.Input type="text" name="country" />
                        <Form.ErrorMessage field="country" />
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Estado</Form.Label>
                        <Form.Input type="text" name="state" />
                        <Form.ErrorMessage field="state" />
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Cidade</Form.Label>
                        <Form.Input type="text" name="city" />
                        <Form.ErrorMessage field="city" />
                    </Form.Field>
                </div>
                <Form.Field>
                    <Form.Label>Qual etnia da sua mãe?</Form.Label>
                    <Form.Input type="text" name="mae-etnia" />
                    <Form.ErrorMessage field="mae-etnia" />
                </Form.Field>
                <Form.Field>
                    <Form.Label>Qual etnia da sua pai?</Form.Label>
                    <Form.Input type="text" name="pai-etnia" />
                    <Form.ErrorMessage field="pai-etnia" />
                </Form.Field>
                <Form.Field>
                    <Form.Label>Tu és filha(o) única(o) ou tem irmãos?</Form.Label>
                    <div className="grid grid-flow-col gap-x-4 items-center justify-start">
                        <div className="flex flex-row gap-x-1">
                            <Form.Input type="radio" name="irmaos" value="Filho único" />
                            <h1>Filho único</h1>
                        </div>
                        <div className="flex flex-row gap-x-1">
                            <Form.Input type="radio" name="irmaos" value="Tenho irmãos" />
                            <h1>Tenho irmãos</h1>
                        </div>
                    </div>
                    <Form.ErrorMessage field="pai-etnia" />
                </Form.Field>
                <Form.Field>
                    <Form.Label>Caso tu tenhas irmãos, DESCONSIDERANDO o sexo, qual é tua ordem de nascimento com relação a todos teus irmãos por parte de pai, de mãe ou de ambos?</Form.Label>
                    <Form.Input type="text" name="ordem-nascimento" />
                    <label className="text-sm text-neutral-600">Considere também irmãos que tenham falecido na gestação.</label>
                    <label className="text-sm text-neutral-600">(Exemplo: “sou o 3o filho por parte de pai e 1o por parte de mãe”, ou “sou 1o filho por parte de pai e mãe”. Caso não tenha irmãos responda “não tenho irmãos”)</label>
                    <Form.ErrorMessage field="ordem-nascimento" />
                </Form.Field>
                <button className="bg-emerald-500 rounded w-full h-10 text-white hover:bg-emerald-600">Finalizar</button>
            </form>
        </FormProvider>
    </div>
}

export default FormAnswering;