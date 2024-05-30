register_aw9l = [
	[16384, 0.1, 'Phase voltage A', 'V'], # 4000 1
	[16386, 0.1, 'Phase voltage B', 'V'], # 4002 1
	[16388, 0.1, 'Phase voltage C', 'V'], # 4004 1
	[16390, 0.1, 'Wire voltage AB', 'V'], # 4006 1
	[16392, 0.1, 'Wire voltage BC', 'V'], # 4008 1
	[16394, 0.1, 'Wire voltage CA', 'V'], # 400a 1
	[16396, 0.001, 'Phase current A', 'A'], # 400c 1
	[16398, 0.001, 'Phase current B', 'A'], # 400e 1 
	[16400, 0.001, 'Phase current C', 'A'], # 4010 1
	[16402, 0.1, 'Active power A', 'W'], # 4012 1
	[16404, 0.1, 'Active power B', 'W'], # 4014 1
	[16406, 0.1, 'Active power C', 'W'], # 4016 1
	[16408, 0.1, 'Total active power', 'W'], # 4018 1
	[16410, 0.1, 'Reactive power A', 'var'], # 401a 1
	[16412, 0.1, 'Reactive power B', 'var'], # 401c 1
	[16414, 0.1, 'Reactive power C', 'var'], # 401e 1
	[16416, 0.1, 'Total reactive power', 'var'], # 4020 1
	[16418, 0.1, 'Apparent power A', 'VA'], # 4022 1
	[16420, 0.1, 'Apparent power B', 'VA'], # 4024 1
	[16422, 0.1, 'Apparent power C', 'VA'], # 4026 1
	[16424, 0.1, 'Total apparent power', 'VA'], # 4028 1 
	[16426, 0.001, 'Power factor A', ''], # 402a 1
	[16428, 0.001, 'Power factor B', ''], # 402c 1
	[16430, 0.001, 'Power factor C', ''], # 402e 1
	[16432, 0.001, 'Total power factor', ''], # 4030 1 
	[16434, 0.01, 'Frequency', 'Hz'], # 4032 1
	[16436, 0.001, 'Active power', 'kWh'], # 4034 1
	[16438, 0.001, 'Reactive power', 'kvarh'], # 4036 1
	[16440, 0.001, 'Positive active power', 'kWh'], # 4038 1
	[16442, 0.001, 'Negative active power', 'kWh'], # 403a 1
	[16444, 0.001, 'Positive reactive power', 'kvarh'], # 403c 1
	[16446, 0.001, 'Negative reactive power', 'kvarh'], # 403e 1
	[16454, 0.1, 'Current active power demand', 'W'], # 4046 1
	[16456, 0.1, 'Maximum active power demand', 'W'], # 4048 1
	[16458, 0.1, 'Current reactive power demand', 'kvar'], # 404a 1
	[16460, 0.1, 'Maximum reactive power demand', 'kvar'], # 404c 1
	[16466, 0.1, 'A phase voltage total harmonic content', '%'], # 4052 1
	[16468, 0.1, 'B phase voltage total harmonic content', '%'], # 4054 1
	[16470, 0.1, 'C phase voltage total harmonic content', '%'], # 4056 1
	[16472, 0.1, 'A phase current total harmonic content', '%'], # 4058 1
	[16474, 0.1, 'B phase current total harmonic content', '%'], # 405a 1
	[16476, 0.1, 'C phase current total harmonic content', '%'], # 405c 1
	[16478, 0.001, '0 phase current', 'A'], # 405e 1
	[16480, 0.1, 'Phase voltage maximum', 'V'], # 4060 1 
	[16482, 0.1, 'Wires voltage maximum', 'V'], # 4062 1
	[16484, 0.001, 'Current maximum', 'A'], # 4064 1
	[16486, 0.1, 'Voltage imbalance', '%'], # 4066 1
	[16488, 0.1, 'Current imbalance', '%'], # 4068 1
	[16490, 1, 'A, B phase voltage angle', '°'], # 406a 1
	[16492, 1, 'B, C phase voltage angle', '°'], # 406c 1
	[16494, 1, 'C, A phase voltage angle', '°'], # 406e 1
	[16496, 0.001, 'First quadrant reactive energy', 'kvarh'], # 4070 1
	[16498, 0.001, 'Second quadrant reactive energy', 'kvarh'], # 4072 1
	[16500, 0.001, 'Third quadrant reactive energy', 'kvarh'], # 4074 1
	[16502, 0.001, 'Fourth quadrant reactive power', 'kvarh'], # 4076 1
    [16640, 0.001, 'Total cumulative total active energy', 'kWh'], # 4100 1
    [16642, 0.001, 'Total cumulative sharp active energy', 'kWh'], # 4102 1
    [16644, 0.001, 'Total cumulative peak active energy', 'kWh'], # 4104 1
    [16646, 0.001, 'Total cumulative flat active energy', 'kWh'], # 4106 1
    [16648, 0.001, 'Total cumulative valley active energy', 'kWh'], #4108 1 
    [16650, 0.001, 'Cumulative total active energy this month', 'kWh'], #410a 1
    [16652, 0.001, 'Cumulative total sharp active energy this month', 'kWh'], # 410c 1
    [16654, 0.001, 'Cumulative total peak actenergy this month', 'kWh'], # 410e 1
    [16656, 0.001, 'Cumulative total flat actenergy this month', 'kWh'], # 4110 1
    [16658, 0.001, 'Cumulative total valley actenergy this month', 'kWh'], # 4112 1
    [16660, 0.001, 'Cumulative total active energy last month', 'kWh'], # 4114 1
    [16662, 0.001, 'Cumulative total sharp active energy last month', 'kWh'], # 4116 1
    [16664, 0.001, 'Cumulative total peak active energy last month', 'kWh'], # 4118 1
    [16666, 0.001, 'Cumulative total flat active energy last month', 'kWh'], # 411a 1
    [16668, 0.001, 'Cumulative total valley active energy last month', 'kWh'], # 411c 1
    [16670, 0.001, 'Cumulative total active energy last two months', 'kWh'], # 411e 1
    [16672, 0.001, 'Cumulative total sharp active energy last two months', 'kWh'], # 4120
    [16674, 0.001, 'Cumulative total peak active energy last two months', 'kWh'], # 4122
    [16676, 0.001, 'Cumulative total flat active energy last two months', 'kWh'], # 4124
    [16678, 0.001, 'Cumulative total valley active energy last two months', 'kWh'], # 4126
    # [16896, 0.01, 'A phase voltage 0th harmonic', '%'], # 4200
    # [16928, 0.01, 'A phase current 0th harmonic', '%'], # 4220
    # [17152, 0.01, 'B phase voltage 0th harmonic', '%'], # 4300
    # [17184, 0.01, 'B phase current 0th harmonic', '%'], # 4320
    # [17408, 0.01, 'C phase current 0th harmonic', '%'], # 4400
    # [17440, 0.01, 'C phase current 0th harmonic', '%'], # 4420
]

repo = {
    "AW9L": register_aw9l 
}