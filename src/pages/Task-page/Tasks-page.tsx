import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import "./Task-page.css";

import { fetchGetIssuesForDesigners } from "../../store/api-request-with-params.ts";
import { useTranslation } from "react-i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

type TBarData = {
  receive: number;
  send: number;
};

const defineWeek = (finishedDate: Date): number => {
  const msInWeek = 7 * 24 * 60 * 60 * 1000;
  const nowMs = new Date().getTime();
  const enteredData = new Date(finishedDate).getTime();

  return Math.round((nowMs - enteredData) / msInWeek);
};

function TaskPage() {
  const [selectedWeek, setSelectedWeek] = useState<string>(`8`);
  const [taskCountForStatuses, setTaskCountForStatuses] = useState<number[]>(
    [],
  );
  const [moneyInProject, setMoneyInProject] = useState<TBarData[]>([
    {
      receive: 0,
      send: 0,
    },
  ]);
  const { t } = useTranslation();

  const taskStatuses = [`Done`, `In progress`, `New`];

  useEffect(() => {
    const fetchData = async () => {
      const counts = await Promise.all(
        taskStatuses.map((taskStatus) =>
          fetchGetIssuesForDesigners(`&status=${taskStatus}`).then(
            (data) => data.length,
          ),
        ),
      );
      setTaskCountForStatuses(counts);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const dataAboutMoney: TBarData[] = Array.from(
      { length: Number(selectedWeek) },
      () => ({
        receive: 0,
        send: 0,
      }),
    );
    const fetchData = async () => {
      await fetchGetIssuesForDesigners(``).then((data) => {
        data
          .filter((issue) => {
            return defineWeek(issue.date_finished) <= Number(selectedWeek);
          })
          .map((issue) => {
            dataAboutMoney[defineWeek(issue.date_finished) - 1] = {
              receive:
                dataAboutMoney[defineWeek(issue.date_finished) - 1].receive +
                issue.received_from_client,
              send:
                dataAboutMoney[defineWeek(issue.date_finished) - 1].send +
                issue.send_to_account_manager +
                issue.send_to_designer +
                issue.send_to_project_manager,
            };
          });
      });

      setMoneyInProject(dataAboutMoney);
    };

    fetchData();
  }, [selectedWeek]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWeek(event.target.value);
  };

  const barData = {
    labels: Array.from(
      { length: parseInt(selectedWeek) },
      (_, i) => `Week ${i + 1}`,
    ),
    datasets: [
      {
        label: t(`send`),
        data: moneyInProject.map((item) => item.receive),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: t(`receive`),
        data: moneyInProject.map((item) => item.send),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: t(`diff`),
        data: moneyInProject.map((item) => item.receive - item.send),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#e7cb0a", // Цвет подписей оси Y
        },
        title: {
          display: true,
          text: "Рублей",
          color: "#e7cb0a", // Цвет заголовка оси Y
        },
      },
      x: {
        ticks: {
          color: "#e7cb0a", // Цвет подписей оси X
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#e7cb0a", // Цвет подписей легенды
        },
      },
    },
  };

  const pieData = {
    labels: [t(`closed`), t(`inProgress`), t(`inWork`)],
    datasets: [
      {
        data: taskCountForStatuses,
        backgroundColor: ["#2d3372", "#a69f3e", "#8c4843"],
        borderColor: "rgba(255,255,255,0.81)",
        hoverOffset: 4,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#e7cb0a", // Цвет подписей легенды
        },
      },
    },
  };

  return (
    <main className="task-page">
      <h1 className="visually-hidden">Страница задач</h1>

      <section className="task-chart">
        <h2>{t(`ScheduleTasks`)}</h2>
        <div className={`chart-wrapper`}>
          <Bar data={barData} options={barOptions}></Bar>
        </div>

        <div className="weeks-selector">
          <label htmlFor="weeks">{t(`chooseWeek`)}:</label>
          <select
            id="weeks"
            value={selectedWeek}
            onChange={(evt) => handleChange(evt)}
          >
            <option value="4">4 {t(`weeks1`)}</option>
            <option value="8">8 {t(`weeks2`)}</option>
            <option value="12">12 {t(`weeks2`)}</option>
            <option value="16">16 {t(`weeks2`)}</option>
          </select>
        </div>
      </section>

      <section className="task-status-chart">
        <h2>{t(`percentageStatuses`)}</h2>
        <div className={`chart-wrapper`}>
          <Pie data={pieData} options={pieOptions}></Pie>
        </div>
      </section>
    </main>
  );
}

export default TaskPage;
