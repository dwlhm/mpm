register_aw9l = [
	[16384, 0.1, 'Phase voltage A', 'V'], # 4000
	[16386, 0.1, 'Phase voltage B', 'V'], # 4002
	[16388, 0.1, 'Phase voltage C', 'V'], # 4004
	[16390, 0.1, 'Wire voltage AB', 'V'], # 4006
	[16392, 0.1, 'Wire voltage BC', 'V'], # 4008
	[16394, 0.1, 'Wire voltage CA', 'V'], # 400a
	[16396, 0.001, 'Phase current A', 'A'], # 400c
	[16398, 0.001, 'Phase current B', 'A'], # 400e
	[16400, 0.001, 'Phase current C', 'A'], # 4010
	[16402, 0.1, 'Active power A', 'W'], # 4012 
	[16404, 0.1, 'Active power B', 'W'], # 4014 
	[16406, 0.1, 'Active power C', 'W'], # 4016 
	[16408, 0.1, 'Total active power', 'W'], # 4018 
	[16410, 0.1, 'Reactive power A', 'var'], # 401a 
	[16412, 0.1, 'Reactive power B', 'var'], # 401c
	[16414, 0.1, 'Reactive power C', 'var'], # 401e  
	[16416, 0.1, 'Total reactive power', 'var'], # 4020 
	[16418, 0.1, 'Apparent power A', 'VA'], # 4022
	[16420, 0.1, 'Apparent power B', 'VA'], # 4024 
	[16422, 0.1, 'Apparent power C', 'VA'], # 4026 
	[16424, 0.1, 'Total apparent power', 'VA'], # 4028 
	[16426, 0.001, 'Power factor A', ''], # 402a 
	[16428, 0.001, 'Power factor B', ''], # 402c 
	[16430, 0.001, 'Power factor C', ''], # 402e
	[16432, 0.001, 'Total power factor', ''], # 4030 
	[16434, 0.01, 'Frequency', 'Hz'], # 4032 
	[16436, 0.001, 'Active power', 'kWh'], # 4034 
	[16438, 0.001, 'Reactive power', 'kvarh'], # 4036 
	[16440, 0.001, 'Positive active power', 'kWh'], # 4038 
	[16442, 0.001, 'Negative active power', 'kWh'], # 403a 
	[16444, 0.001, 'Positive reactive power', 'kvarh'], # 403c 
	[16446, 0.001, 'Negative reactive power', 'kvarh'], # 403e 
	[16454, 0.1, 'Current active power demand', 'W'], # 4046 
	[16456, 0.1, 'Maximum active power demand', 'W'], # 4048 
	[16458, 0.1, 'Current reactive power demand', 'kvar'], # 404a
	[16460, 0.1, 'Maximum reactive power demand', 'kvar'], # 404c 
	[16466, 0.1, 'A phase voltage total harmonic content', '%'], # 4052 
	[16468, 0.1, 'B phase voltage total harmonic content', '%'], # 4054
	[16470, 0.1, 'C phase voltage total harmonic content', '%'], # 4056 
	[16472, 0.1, 'A phase current total harmonic content', '%'], # 4058 
	[16474, 0.1, 'B phase current total harmonic content', '%'], # 405a 
	[16476, 0.1, 'C phase current total harmonic content', '%'], # 405c 
	[16478, 0.001, '0 phase current', 'A'], # 405e 
	[16480, 0.1, 'Phase voltage maximum', 'V'], # 4060 
	[16482, 0.1, 'Wires voltage maximum', 'V'], # 4062 
	[16484, 0.001, 'Current maximum', 'A'], # 4064 
	[16486, 0.1, 'Voltage imbalance', '%'], # 4066 
	[16488, 0.1, 'Current imbalance', '%'], # 4068 
	[16490, 1, 'A, B phase voltage angle', '°'], # 406a 
	[16492, 1, 'B, C phase voltage angle', '°'], # 406c 
	[16494, 1, 'C, A phase voltage angle', '°'], # 406e 
	[16496, 0.001, 'irst quadrant reactive energy', 'kvarh'], # 4070 
	[16498, 0.001, 'Second quadrant reactive energy', 'kvarh'], # 4072 
	[16500, 0.001, 'Third quadrant reactive energy', 'kvarh'], # 4074 
	[16502, 0.001, 'Fourth quadrant reactive power', 'kvarh'], # 4076
    [16640, 0.001, 'Total cumulative total active energy', 'kWh'], # 4100
    [16642, 0.001, 'Total cumulative sharp active energy', 'kWh'], # 4102
    [16644, 0.001, 'Total cumulative peak active energy', 'kWh'], # 4104
    [16646, 0.001, 'Total cumulative flat active energy', 'kWh'], # 4106
    [16648, 0.001, 'Total cumulative valley active energy', 'kWh'], #4108
    [16650, 0.001, 'Cumulative total active energy this month', 'kWh'], #410a
    [16652, 0.001, 'Cumulative total sharp active energy this month', 'kWh'], # 410c
    [16654, 0.001, 'Cumulative total peak actenergy this month', 'kWh'], # 410e
    [16656, 0.001, 'Cumulative total flat actenergy this month', 'kWh'], # 4110
    [16658, 0.001, 'Cumulative total valley actenergy this month', 'kWh'], # 4112
    [16660, 0.001, 'Cumulative total active energy last month', 'kWh'], # 4114
    [16662, 0.001, 'Cumulative total sharp active energy last month', 'kWh'], # 4116
    [16664, 0.001, 'Cumulative total peak active energy last month', 'kWh'], # 4118
    [16666, 0.001, 'Cumulative total flat active energy last month', 'kWh'], # 411a
    [16668, 0.001, 'Cumulative total valley active energy last month', 'kWh'], # 411c
    [16670, 0.001, 'Cumulative total active energy last two months', 'kWh'], # 411e
    [16672, 0.001, 'Cumulative total sharp active energy last two months', 'kWh'], # 4120
    [16674, 0.001, 'Cumulative total peak active energy last two months', 'kWh'], # 4122
    [16676, 0.001, 'Cumulative total flat active energy last two months', 'kWh'], # 4124
    [16678, 0.001, 'Cumulative total valley active energy last two months', 'kWh'], # 4126
    [16896, 0.01, 'A phase voltage 0th harmonic', '%'], # 4200
    [16928, 0.01, 'A phase current 0th harmonic', '%'], # 4220
    [17152, 0.01, 'B phase voltage 0th harmonic', '%'], # 4300
    [17184, 0.01, 'B phase current 0th harmonic', '%'], # 4320
    [17408, 0.01, 'C phase current 0th harmonic', '%'], # 4400
    [17440, 0.01, 'C phase current 0th harmonic', '%'], # 4420
]

repo = {
    "AW9L": register_aw9l 
}