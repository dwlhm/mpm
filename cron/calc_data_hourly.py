from datetime import datetime, timedelta

if __name__ == "__main__":
    data = datetime.today() - timedelta(hours=1)
    print(f"perbedaan: {data}")