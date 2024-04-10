import countryCodes from "./countyCode"

export const coreDataMain = [
    {
        title: 'Код страны',
        isDropdawn: { type: 'countryCode', data: countryCodes },
        isMandatory: true,
        isDate: false,
        descriptionHint: 'Государство, в которой проводилась калибровка	dcc:countryCodeISO3166_1	T(=2)	M	-	Указание страны, в которой была проведена калибровка. Информация приводится в виде кода страны, указанного в стандарте ISO 3166 [] (две заглавные буквы).',
        example: 'Ru',
    },
    {
        title: 'Язык на котором создавался DCC',
        isDropdawn: { type: 'countryCode', data: countryCodes },
        isMandatory: true,
        isDate: false,
        descriptionHint: 'Указание официального языка(-ов), на котором(-ых) был создан DCC. Возможно указать несколько языков. Информация приводится в виде кода официального языка, указанного в стандарте ISO 639 [] (две строчные буквы).',
        example: 'Ru',
    },
    {
        title: 'Язык использующийся при спорных ситуациях',
        isDropdawn: { type: 'countryCode', data: countryCodes },
        isMandatory: true,
        isDate: false,
        descriptionHint: 'Определение официального языка(-ов), действительного(-ых) в случае спорных ситуаций. Возможно указать несколько языков.  Информация приводится в виде кода официального языка, указанного в стандарте ISO 639 [] (две строчные буквы).',
        example: 'Ru',
    },
    {
        title: 'Уникальный идентификатор',
        isDropdawn: false,
        isMandatory: true,
        isDate: false,
        descriptionHint: 'В элементе должен быть указан уникальный идентификатор DCC (номер сертификата калибровки). Необходимым условием является уникальность идентификатора в организации, где расположена калибровочная лаборатория. Не допускаются записи только с пробелами, а также с пробелами перед и (или) в конце значения.',
        example: 'dcc-1',
    },
    {
        title: 'Дата получения объекта калибровки',
        isDropdawn: false,
        isMandatory: false,
        isDate: true,
        descriptionHint: 'Элемент содержит дополнительные идентификаторы, которые точно описывают сертификат калибровки. Элемент содержит дочерний элемент dcc:identification.',
        example: '2001.02.03',
    },
    {
        title: 'Дата начала калибровки',
        isDropdawn: false,
        isMandatory: true,
        isDate: true,
        descriptionHint: 'Дата указывается, если она оказывает временное влияние на результат калибровки. Дата указывается в формате год-месяц-день. ',
        example: '2001.02.03',
    },
    {
        title: 'Дата окончания калибровки',
        isDropdawn: false,
        isMandatory: true,
        isDate: true,
        descriptionHint: 'В стандарте DIN EN ISO/IEC 17025:2018-03 [] указано, что дата или период калибровки является существенной частью сертификата калибровки, поэтому элемент beginPerformanceDate должен быть заполнен. Дата указывается в формате год-месяц-день.',
        example: '2001.02.03',
    },
    {
        title: 'Дата выдачи',
        isDropdawn: false,
        isMandatory: false,
        isDate: true,
        descriptionHint: 'В стандарте DIN EN ISO/IEC 17025:2018-03 [] указано, что дата или период калибровки является существенной частью сертификата калибровки, поэтому элемент endPerformanceDate должен быть заполнен. Если калибровка проводится в один день, то в элементах beginPerformanceDate и endPerformanceDate должна быть указана одна и та же дата. Дата указывается в формате год-месяц-день.',
        example: '2001.02.03',
    },
]

export const coreDataAdditionaly = [
    {
        title: 'Организация присвоившая идентификатор',
        isDropdawn: {
            type: 'default',
            data: [
                'manufacturer',
                'calibrationLaboratory',
                'customer',
                'owner',
                'other',
            ]
        },
        isDate: false,
        descriptionHint: 'В элементе может быть введено только одно из следующих значений: manufacturer, calibrationLaboratory, customer, owner, other. Если элемент заполнен другим содержимым, то при проверке на соответствие XML-схеме возникает ошибка.',
        example: 'manufacturer',
    },
    {
        title: 'Значение идентификатора',
        isDropdawn: false,
        isDate: false,
        descriptionHint: 'В элементе вводится идентификатор. Не допускаются записи только с пробелами, а также с пробелами перед и (или) в конце значения.',
        example: 'dcc-1',
    },
    {
        title: 'Дополнительная информация об идентификаторе',
        isDropdawn: false,
        isDate: false,
        descriptionHint: 'Имеет один дочерний элемент – dcc:content, в который указывается дополнительная информация об идентификаторе.',
        example: 'Order no',
    },
]